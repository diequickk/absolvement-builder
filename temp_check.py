from pathlib import Path
for path in Path('.').rglob('*'):
    if path.is_file() and path.suffix in {'.js', '.jsx', '.ts', '.tsx', '.json'}:
        data = path.read_bytes()
        bad = [b for b in data if b < 32 and b not in (9, 10, 13)]
        if bad:
            print(path, 'contains control bytes', bad[:20])
