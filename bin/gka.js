#!/usr/bin/env node

var yargs = require('yargs'),
    argv = yargs.argv,
    gka = require("../lib/gka"),
    pkg = require('../package.json'),
    _ = argv._;

var cmd = "";

if (_[0] === 'tool' || _[0] === 't' ) {
    cmd = "tool";

    argv = yargs
    .usage('\nUsage: gka tool <dir> <option>')
    .option('u', {
        boolean: true,
        alias : 'unique',
        describe: 'remove duplicates',
    })
    .option('c', {
        boolean: true,
        alias : 'crop',
        describe: 'crop images',
    })
    .option('m', {
        boolean: true,
        alias : 'mini',
        describe: 'minify images',
    })
    .option('s', {
        boolean: true,
        alias : 'sprites',
        describe: 'sprites images',
        type: "boolean"
    })
    .option('a', {
        default: 'binary-tree',
        choices: ['top-down', 'left-right', 'binary-tree', 'diagonal', 'alt-diagonal'],
        alias : 'algorithm',
        describe: 'sprites layout types',
    })
    .option('p', {
        type: "string",
        alias : 'prefix',
        describe: 'rename with prefix',
        coerce: function (arg) {
            return arg || "prefix-";
        }
    })
    .option('r', {
        boolean: true,
        default: false,
        alias : 'replace',
        describe: 'replace dir'
    })
    .option('i', {
        boolean: true,
        alias : 'info',
        describe: 'get images info',
    })
    .help('h')
    .example('gka tool E:\\img -s')
    .epilog('for more detailed instructions, visit https://github.com/joeyguo/gka')
    .version()
    .argv;

    if (argv.v || argv.version || argv.V) {
        console.log(pkg.version);
        return;
    }

    var dir = _[1] || argv.d;
    if (!dir) {
        console.log();
        console.log('[error]: ' + 'gka tool need dir !');
        console.log('----------------------------');
        yargs.showHelp();
        return;
    }

    gka(dir, {
        // c
        crop: argv.crop,
        // s
        sprites: argv.sprites,
        // m 
        mini: argv.mini,
        // r
        unique: argv.unique,
        // i
        info: argv.info,
        // tpl
        tpl: argv.t || argv.tpl || argv.template,
        // p
        prefix: argv.prefix,
        // f
        frameduration: argv.frameduration,
        // a
        algorithm: argv.algorithm,
        // r
        replace: argv.replace,
        cmd: cmd,
    });

} else {
    argv = yargs
    .option('u', {
        boolean: true,
        alias : 'unique',
        default: true,
        describe: 'remove duplicates'
    })
    // .option('s', {
    //     boolean: true,
    //     alias : 'sprites',
    //     describe: 'sprites images',
    //     type: "boolean"
    // })
    // .option('c', {
    //     boolean: true,
    //     alias : 'crop',
    //     describe: 'crop images',
    // })
    .option('m', {
        boolean: true,
        alias : 'mini',
        describe: 'minify images',
    })
    .option('p', {
        alias : 'prefix',
        describe: 'rename with prefix',
        type: "string",
        coerce: function (arg) {
            return arg || "prefix-";
        }
    })
    .option('f', {
        alias : 'frameduration',
        describe: 'frame duration',
        type: "number",
    })
    .option('t', {
        alias : 'template',
        describe: 'html/js/css template',
        type: "string",
        // demandOption: true, //             
        default: "n",
        coerce: function (arg) {
            return arg || "px";
        }
    })
    .option('i', {
        boolean: true,
        alias : 'info',
        describe: 'get images info',
    })
    .option('a', {
        default: 'binary-tree',
        choices: ['top-down', 'left-right', 'binary-tree', 'diagonal', 'alt-diagonal'],
        alias : 'algorithm',
        describe: 'sprites layout types',
    })
    .help('h')
    .alias('h', 'help')
    .usage('\nUsage: \n  gka <dir> [options] \n  gka <cmd> <dir> [options]')
    .example('gka E:\\img')
    .epilog('for more detailed instructions, visit https://github.com/joeyguo/gka')
    .version()
    .command('tool', 'images processing tools')
    .argv;

    if (argv.v || argv.version || argv.V) {
        console.log(pkg.version);
        return;
    }

    var dir = _[0] || argv.d;
    if (!dir) {
        console.log();
        console.log('[error]: ' + 'gka need dir !');
        console.log('----------------------------');
        yargs.showHelp();
        return;
    }

    gka(dir, {
        // c                   
        crop: argv.c,
        // s                   
        sprites: argv.s,
        // m 
        mini: argv.mini,
        // u
        unique: argv.unique,
        // i
        info: argv.info,
        // tpl
        tpl: argv.t || argv.tpl || argv.template,
        // p
        prefix: argv.prefix,
        // f
        frameduration: argv.frameduration,
        // a                   
        algorithm: argv.algorithm
    });
}

// console.log(argv);
// return;
// console.log(typeof argv.s);

