from pathlib import Path
import os

files = list(map(str, Path('content').glob('**/*.md')))
for file in files:
    if file.endswith(".vi.md") or  file.endswith(".en.md"):
        continue
    base = file[:-3]
    os.system("cp {} {}".format(file, base + ".vi.md"))
    os.system("mv {} {}".format(file, base + ".en.md"))