def escape_svg(svg_content):
    return svg_content.replace('\"', '\\\"')

svg_content = '''<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="12" y1="2" x2="1" y2="2" stroke="white" stroke-width="2" stroke-linecap="round"/>
<line x1="19" y1="6" x2="11" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
<line x1="15" y1="11" x2="15" y2="1" stroke="white" stroke-width="2" stroke-linecap="round"/>
<line x1="8" y1="10" x2="1" y2="10" stroke="white" stroke-width="2" stroke-linecap="round"/>
<line x1="8" y1="6" x2="1" y2="6" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
'''

print(escape_svg(svg_content))