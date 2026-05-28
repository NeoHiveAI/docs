# Licensing

NeoHive requires a license file to run. Licenses are issued by the NeoHive team.

## First install

During installation, the installer looks for your license file in this order:

1. `--license-file /path/to/file` command-line flag
2. `NEOHIVE_LICENSE_FILE=/path/to/file` environment variable
3. A `license.json` or `license.key` file in the current working directory
4. Interactive prompt

The simplest approach: drop the license file in the directory where you run the installer and let auto-detection handle it.

After first install, the license key is cached at `~/.cache/neohive/license-key`. Future upgrades won't ask for it again.

## Moving to a new machine

When you install NeoHive on a new machine, the previous machine's seat is released automatically. Just run the installer on the new machine with your license file — no cleanup is needed on the old one.

## Rotating your license

If the NeoHive team issues you a replacement license:

```sh
NEOHIVE_LICENSE_FILE=/path/to/new-license.key \
NEOHIVE_ROTATE_LICENSE=1 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

## Viewing license status

Open the NeoHive dashboard and navigate to **Settings**. The Licence page shows your current activation state, expiry, and remaining grace period.

NeoHive allows up to 72 hours of offline grace if the licensing service is briefly unreachable.
