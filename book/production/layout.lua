-- Assign usable paragraph widths to Markdown tables and protect repeatable
-- reader artifacts during LaTeX production.

local function equalize_unspecified_widths(tbl)
  local count = #tbl.colspecs
  if count == 0 then
    return
  end

  local has_width = false
  for _, spec in ipairs(tbl.colspecs) do
    if spec[2] and spec[2] > 0 then
      has_width = true
      break
    end
  end

  if not has_width then
    local width = 1 / count
    for i, spec in ipairs(tbl.colspecs) do
      tbl.colspecs[i] = {spec[1], width}
    end
  end
end

local function style_header_cells(tbl)
  local header_size = #tbl.colspecs >= 7 and '\\scriptsize' or '\\footnotesize'
  local header_style = '\\cellcolor{PaletteOlive}\\color{PalettePaper}\\sffamily\\bfseries' ..
    header_size .. '\\RaggedRight '

  for _, row in ipairs(tbl.head.rows) do
    for _, cell in ipairs(row.cells) do
      local styled = false
      for _, block in ipairs(cell.contents) do
        if block.t == 'Plain' or block.t == 'Para' then
          table.insert(block.content, 1,
            pandoc.RawInline('latex', header_style))
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
  equalize_unspecified_widths(tbl)
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

function Header(header)
  local label = pandoc.utils.stringify(header.content)
  if header.level == 2 and label:match('^Worksheet %d+') then
    return {
      pandoc.RawBlock('latex', '\\clearpage'),
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

  return header
end
