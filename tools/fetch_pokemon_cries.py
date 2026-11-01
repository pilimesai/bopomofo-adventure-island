import asyncio
import aiohttp
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DEST_DIR = 'assets/audio/cries'
os.makedirs(DEST_DIR, exist_ok=True)

BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/{}.ogg'

sem = asyncio.Semaphore(15)

async def fetch_cry(session, pid):
    dest = os.path.join(DEST_DIR, f"cry_{pid}.ogg")
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        return pid, True

    url = BASE_URL.format(pid)
    async with sem:
        try:
            async with session.get(url, timeout=10) as resp:
                if resp.status == 200:
                    data = await resp.read()
                    with open(dest, 'wb') as f:
                        f.write(data)
                    return pid, True
                else:
                    print(f"HTTP {resp.status} for #{pid}")
                    return pid, False
        except Exception as e:
            print(f"Error #{pid}: {e}")
            return pid, False

async def main():
    print("Downloading all 151 Pokémon official cries...")
    connector = aiohttp.TCPConnector(limit=15)
    async with aiohttp.ClientSession(connector=connector) as session:
        tasks = [fetch_cry(session, pid) for pid in range(1, 152)]
        results = await asyncio.gather(*tasks)
        success = sum(1 for _, ok in results if ok)
        print(f"Downloaded {success}/151 cries into {DEST_DIR}!")

if __name__ == '__main__':
    asyncio.run(main())

