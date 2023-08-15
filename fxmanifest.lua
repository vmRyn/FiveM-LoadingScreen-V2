fx_version 'adamant'
game 'gta5'

author 'rynfreshly' -- # Discord
description 'Icarus Loading Screen 2.0'


files {
    '*.html',
    '*.php',
    '*.js',
    'assets/audio/',
    'assets/fonts/',
    'img/*.png',
    'img/*.jpg',
    'css/*.css',
    'scripts/*.js'
}

client_script 'client.lua'

--loadscreen_manual_shutdown "yes"
loadscreen 'index.html'