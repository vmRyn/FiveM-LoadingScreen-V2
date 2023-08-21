fx_version 'adamant'
game 'gta5'

author 'rynfreshly' -- # Discord
description 'Icarus Loading Screen 2.0'


files {
    '*.html',
    '*.php',
    'assets/audio/*.mp3',
    'assets/fonts/',
    'assets/*.png',
    'img/*.png',
    'img/*.jpg',
    'css/*.css',
    'scripts/*.js'
}

client_script 'client.lua'

--loadscreen_manual_shutdown "yes"
loadscreen 'index.html'