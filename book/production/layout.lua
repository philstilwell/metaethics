-- Assign usable paragraph widths to Markdown tables and protect repeatable
-- reader artifacts during LaTeX production.

local cell_padding_style =
  '\\advance\\leftskip by 4.5pt\\advance\\rightskip by 4.5pt '
local value_cell_padding_style =
  '\\advance\\leftskip by 5.5pt\\advance\\rightskip by 5.5pt '
local stripe_style = '\\rowcolor{PaletteOchre!11} '

local function prepend_cell_style(cell, latex)
  for _, block in ipairs(cell.contents) do
    if block.t == 'Plain' or block.t == 'Para' then
      table.insert(block.content, 1, pandoc.RawInline('latex', latex))
      return
    end
  end

  cell.contents = {
    pandoc.Plain({pandoc.RawInline('latex', latex)})
  }
end

local function style_rows(rows, latex)
  for _, row in ipairs(rows) do
    for _, cell in ipairs(row.cells) do
      prepend_cell_style(cell, latex)
    end
  end
end

local function pad_all_cells(tbl, padding_style, body_padding_style)
  style_rows(tbl.head.rows, padding_style)

  for _, body in ipairs(tbl.bodies) do
    style_rows(body.head, body_padding_style)
    style_rows(body.body, body_padding_style)
  end

  style_rows(tbl.foot.rows, padding_style)
end

local function stripe_body_rows(tbl)
  local row_number = 0

  local function stripe_rows(rows)
    for _, row in ipairs(rows) do
      row_number = row_number + 1
      if row_number % 2 == 1 and #row.cells > 0 then
        prepend_cell_style(row.cells[1], stripe_style)
      end
    end
  end

  for _, body in ipairs(tbl.bodies) do
    stripe_rows(body.head)
    stripe_rows(body.body)
  end
end

local function normalize_table_widths(tbl)
  local count = #tbl.colspecs
  if count == 0 then
    return
  end

  local specified_count = 0
  local specified_total = 0
  for _, spec in ipairs(tbl.colspecs) do
    if spec[2] and spec[2] > 0 then
      specified_count = specified_count + 1
      specified_total = specified_total + spec[2]
    end
  end

  -- Leave a one-per-thousand rounding reserve. Pandoc writes fractional
  -- column widths to four decimals, which can otherwise accumulate a
  -- sub-point overrun in TeX. Preserve Pandoc's proportions when every
  -- column has a usable width; otherwise use stable equal widths.
  if specified_count == count then
    local scale = 0.999 / specified_total
    for i, spec in ipairs(tbl.colspecs) do
      tbl.colspecs[i] = {spec[1], spec[2] * scale}
    end
  else
    local width = 0.999 / count
    for i, spec in ipairs(tbl.colspecs) do
      tbl.colspecs[i] = {spec[1], width}
    end
  end
end

local function first_header_label(tbl)
  if #tbl.head.rows == 0 or #tbl.head.rows[1].cells == 0 then
    return ''
  end

  return pandoc.utils.stringify(tbl.head.rows[1].cells[1].contents)
end

local function tune_special_table_widths(tbl)
  local count = #tbl.colspecs
  local first_label = first_header_label(tbl)

  local function apply_widths(widths)
    for i, width in ipairs(widths) do
      tbl.colspecs[i] = {tbl.colspecs[i][1], width}
    end
  end

  -- The Access Audit has nine short response columns but a first column
  -- containing complete claims. Equal widths make those claims stack into
  -- nearly one-word lines and unnecessarily force the worksheet over two
  -- landscape pages. Preserve room for the response fields while giving the
  -- claim column enough measure to remain readable.
  if count == 10 and first_label == 'Foundational claim' then
    local first_width = 0.20
    local independence_width = 0.105
    local other_width = (0.999 - first_width - independence_width) / (count - 2)
    tbl.colspecs[1] = {tbl.colspecs[1][1], first_width}
    for i = 2, count do
      tbl.colspecs[i] = {tbl.colspecs[i][1], other_width}
    end
    tbl.colspecs[6] = {tbl.colspecs[6][1], independence_width}
  elseif count == 6 and first_label == 'Value' then
    -- Keep the value inventory compact while reserving more measure for the
    -- proposed ground and the people or practices that bear the stake.
    apply_widths({0.115, 0.125, 0.235, 0.155, 0.155, 0.214})
  elseif count == 7 and first_label == 'Value or concern' then
    -- The workbook version adds evidence and source columns and rotates to
    -- landscape. Unequal widths keep every header to a readable phrase and
    -- provide writing room where the reader supplies substantive content.
    apply_widths({0.125, 0.105, 0.175, 0.135, 0.135, 0.175, 0.149})
  elseif count == 4 and first_label == 'Candidate' then
    apply_widths({0.210, 0.250, 0.245, 0.294})
  elseif count == 5 and first_label == 'Object' then
    apply_widths({0.155, 0.277, 0.182, 0.235, 0.150})
  end
end

local function is_value_inventory(tbl)
  local label = first_header_label(tbl)
  return label == 'Value' or label == 'Value or concern'
end

local function style_header_cells(tbl)
  local header_size = #tbl.colspecs >= 7 and '\\scriptsize' or '\\footnotesize'
  local vertical_lead = is_value_inventory(tbl) and '\\rule{0pt}{3.0ex}' or ''
  local vertical_tail = is_value_inventory(tbl) and
    '\\rule[-1.15ex]{0pt}{1.15ex}' or ''
  local header_style = '\\cellcolor{PaletteOlive}\\color{PalettePaper}\\sffamily\\bfseries' ..
    header_size .. '\\RaggedRight\\hyphenpenalty=10000 ' .. vertical_lead

  for _, row in ipairs(tbl.head.rows) do
    for _, cell in ipairs(row.cells) do
      local styled = false
      for _, block in ipairs(cell.contents) do
        if block.t == 'Plain' or block.t == 'Para' then
          table.insert(block.content, 1, pandoc.RawInline('latex', header_style))
          if vertical_tail ~= '' then
            table.insert(block.content, pandoc.RawInline('latex', vertical_tail))
          end
          styled = true
          break
        end
      end

      if not styled then
        local content = {pandoc.RawInline('latex', header_style)}
        if vertical_tail ~= '' then
          table.insert(content, pandoc.RawInline('latex', vertical_tail))
        end
        cell.contents = {pandoc.Plain(content)}
      end
    end
  end
end

function Table(tbl)
  normalize_table_widths(tbl)
  tune_special_table_widths(tbl)
  local padding_style = is_value_inventory(tbl) and
    value_cell_padding_style or cell_padding_style
  local first_label = first_header_label(tbl)
  local body_padding_style = padding_style
  if first_label == 'Value' then
    -- Four compact writing rows belong inside the narrative text block.
    body_padding_style = padding_style .. '\\rule{0pt}{2.2\\baselineskip}'
  elseif first_label == 'Value or concern' then
    -- The workbook table owns a landscape page; use that page as writable
    -- space instead of compressing four entries into one-line strips.
    body_padding_style = padding_style .. '\\rule{0pt}{6.2\\baselineskip}'
  end
  pad_all_cells(tbl, padding_style, body_padding_style)
  stripe_body_rows(tbl)
  style_header_cells(tbl)
  local count = #tbl.colspecs

  if count >= 7 then
    return {
      pandoc.RawBlock('latex', '\\clearpage\\begin{landscape}\\footnotesize'),
      tbl,
      pandoc.RawBlock('latex', '\\end{landscape}\\clearpage')
    }
  elseif count >= 5 then
    return {
      pandoc.RawBlock('latex', '{\\small'),
      tbl,
      pandoc.RawBlock('latex', '}')
    }
  end

  return tbl
end

function Para(para)
  local text = pandoc.utils.stringify(para.content)
  if text:match('^Where this chapter is headed%.') or
     text:match('^Where the prologue is headed%.') then
    return {
      pandoc.RawBlock('latex', '\\Needspace{16\\baselineskip}'),
      para
    }
  end

  return para
end

function Header(header)
  local label = pandoc.utils.stringify(header.content)
  if header.level == 2 and label:match('^Worksheet %d+') then
    return {
      pandoc.RawBlock('latex', '\\clearpage'),
      header
    }
  end

  if header.level == 2 and label:match('^Part [IVX]+ deck') then
    return {
      pandoc.RawBlock('latex', '\\Needspace{15\\baselineskip}'),
      header
    }
  end

  if (header.level == 2 and label:match('^Repair %d+')) or
     (header.level == 3 and label:match('^Card %d+')) then
    return {
      pandoc.RawBlock('latex', '\\Needspace{10\\baselineskip}'),
      header
    }
  end

  if header.level == 2 then
    return {
      pandoc.RawBlock('latex', '\\Needspace{8\\baselineskip}'),
      header
    }
  end

  return header
end
