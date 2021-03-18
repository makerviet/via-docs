from pathlib import Path
import os

files = list(map(str, Path('content').glob('**/*.en.md')))
for file in files:
    with open (file,'r') as b:
        lines = b.readlines()
    
    lines.insert(1, "version: 0\n")
    with open(file,'w') as b:
        b.writelines(lines)