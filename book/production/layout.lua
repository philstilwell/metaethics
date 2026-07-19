-- Assign usable paragraph widths to Markdown tables and protect repeatable
-- reader artifacts during LaTeX production.

local cell_padding_style =
  '\\advance\\leftskip by 4.5pt\\advance\\rightskip by 4.5pt '
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

local function pad_all_cells(tbl)
  style_rows(tbl.head.rows, cell_padding_style)

  for _, body in ipairs(tbl.bodies) do
    style_rows(body.head, cell_padding_style)
    style_rows(body.body, cell_padding_style)
  end

  style_rows(tbl.foot.rows, cell_padding_style)
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

  -- The Access Audit has nine short response columns but a first column
  -- containing complete claims. Equal widths make those claims stack into
  -- nearly one-word lines and unnecessarily force the worksheet over two
  -- landscape pages. Preserve room for the response fields while giving the
  -- claim column enough measure to remain readable.
  if count == 10 and first_header_label(tbl) == 'Foundational claim' then
    local first_width = 0.20
    local independence_width = 0.105
    local other_width = (0.999 - first_width - independence_width) / (count - 2)
    tbl.colspecs[1] = {tbl.colspecs[1][1], first_width}
    for i = 2, count do
      tbl.colspecs[i] = {tbl.colspecs[i][1], other_width}
    end
    tbl.colspecs[6] = {tbl.colspecs[6][1], independence_width}
  end
end

local function style_header_cells(tbl)
  local header_size = #tbl.colspecs >= 7 and '\\scriptsize' or '\\footnotesize'
  local header_style = '\\cellcolor{PaletteOlive}\\color{PalettePaper}\\sffamily\\bfseries' ..
    header_size .. '\\RaggedRight\\hyphenpenalty=10000 '

  for _, row in ipairs(tbl.head.rows) do
    for _, cell in ipairs(row.cells) do
      local styled = false
      for _, block in ipairs(cell.contents) do
        if block.t == 'Plain' or block.t == 'Para' then
          table.insert(block.content, 1, pandoc.RawInline('latex', header_style))
          styled = true
          break
        end
      end

      if not styled then
        cell.contents = {
          pandoc.Plain({
            pandoc.RawInline('latex', header_style)
          })
        }
      end
    end
  end
end

function Table(tbl)
  normalize_table_widths(tbl)
  tune_special_table_widths(tbl)
  pad_all_cells(tbl)
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
