# install notes

(Probably not the right way)

```bash
# ruby from APT
sudo apt install ruby ruby-dev

# jekyll and support from gem
gem install jekyll jekyll-academic jekyll-archives bundler

# make the home dirs writeable
chown www-data:ve /var/www -R
chmod 775 /var/www -R

```
