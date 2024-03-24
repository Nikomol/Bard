def escape_svg(svg_content):
    return svg_content.replace('\"', '\\\"')

svg_content = '''<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="21.5" cy="21.5" r="21.5" fill="#862AE2"/>
<path d="M29.7876 21.1067C30.0425 21.3069 30.0425 21.693 29.7876 21.8932L17.4989 31.5422C17.1708 31.7998 16.6901 31.5661 16.6901 31.149V11.8509C16.6901 11.4338 17.1708 11.2001 17.4989 11.4577L29.7876 21.1067Z" stroke="white" stroke-width="3"/>
</svg>
'''

print(escape_svg(svg_content))