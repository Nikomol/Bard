def escape_svg(svg_content):
    return svg_content.replace('\"', '\\\"')

svg_content = '''
<svg width="195" height="195" viewBox="0 0 195 195" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 20C0 8.9543 8.9543 0 20 0H175C186.046 0 195 8.9543 195 20V175C195 186.046 186.046 195 175 195H20C8.9543 195 0 186.046 0 175V20Z" fill="url(#paint0_linear_201_621)"/>
<path d="M58.1149 101.804C49.2812 92.9705 49.2812 78.6484 58.1149 69.8147C66.9485 60.981 81.2707 60.981 90.1044 69.8147L129.264 108.974L97.2744 140.964L58.1149 101.804Z" fill="#D9D9D9"/>
<path d="M104.438 70.0896C113.272 61.2559 127.594 61.2559 136.427 70.0896C145.261 78.9233 145.261 93.2455 136.427 102.079L97.2678 141.239L65.2783 109.249L104.438 70.0896Z" fill="#D9D9D9"/>
<defs>
<linearGradient id="paint0_linear_201_621" x1="97.5" y1="0" x2="97.5" y2="195" gradientUnits="userSpaceOnUse">
<stop offset="0.00122897" stop-color="#2565E1"/>
<stop offset="1" stop-color="#26CBCB" stop-opacity="0.98"/>
</linearGradient>
</defs>
</svg>
'''

print(escape_svg(svg_content))