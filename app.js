/**
 * Created by Mykyta Khmel(hmelenok@gmail.com) on 26.02.2015.
 */

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var hero1 = new Image();
var hero2 = new Image();
var hero3 = new Image();
var hero4 = new Image();
var hero5 = new Image();
var hero6 = new Image();
var hero7 = new Image();
var hero8 = new Image();
var ground = new Image();
var sky = new Image();
var pie = new Image();
var cloud = new Image();
var direction;
var speed = 5;
var hero_speed = 5;



function keys(e) {
    //"use strict";


    e = e || event;
    if (e.type === "keydown") {
      //console.log(e);
        if (e.which === 87 || e.which === 38 || e.which === 32) {
            direction = 'up';
            return "up";
        }
        return "";

    }
}
window.onkeydown= keys;



function init() {
    "use strict";
    hero1.src = 'images/hero1.png';
    hero2.src = 'images/hero2.png';
    hero3.src = 'images/hero3.png';
    hero4.src = 'images/hero4.png';
    hero5.src = 'images/hero5.png';
    hero6.src = 'images/hero6.png';
    hero7.src = 'images/hero7.png';
    hero8.src = 'images/hero8.png';
    cloud.src = 'images/cloud.png';
    pie.src = 'images/pie.png';
    ground.src = 'images/ground.png';
    sky.src = 'images/sky.png';
    hero1.height = 50;
    hero1.width = 35;

    // restore_listner();
}
var g = 0;
var m = 0;
var hero_frame = 1;

var run_count = 0;

var cloud_arr = [];
var cloud_countX = 0;

var random_cloudY = [];
var random_cloud_size = [];

var pie_arr = [];
var pie_count = 0;

var incriment = 500;

var screen_points = 0;

function reset_game() {
    'use strict';
    pie_arr = [];
    pie_count = 0;
    hero_frame = 0;
    screen_points = 0;
    run_count = 0;
    speed = 5;
    hero_speed = 5;
}

function heroAnimation() {
    "use strict";
    var hero1X = 25, hero1Y;
    hero1Y = canvas.height - hero1.height - 25;
    hero_frame = hero_frame + 4;
    if (hero_frame > (16 * hero_speed)) {
        hero_frame = 1;
    }

    if (hero_frame >= 1 && hero_frame < (2 * hero_speed)) {
        ctx.drawImage(hero1, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (2 * hero_speed) && hero_frame < (4 * hero_speed)) {
        ctx.drawImage(hero2, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (4 * hero_speed) && hero_frame < (6 * hero_speed)) {
        ctx.drawImage(hero3, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (6 * hero_speed) && hero_frame < (8 * hero_speed)) {
        ctx.drawImage(hero4, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (8 * hero_speed) && hero_frame < (10 * hero_speed)) {
        ctx.drawImage(hero5, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (10 * hero_speed) && hero_frame < (12 * hero_speed)) {
        ctx.drawImage(hero6, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (12 * hero_speed) && hero_frame < (14 * hero_speed)) {
        ctx.drawImage(hero7, hero1X, hero1Y);
        ctx.restore();
    } else if (hero_frame >= (14 * hero_speed)) {
        ctx.drawImage(hero8, hero1X, hero1Y);
        ctx.restore();
    }


}

function hero_actions(ctx) {
    "use strict";
    var hero1X = 25, hero1Y;
    hero1Y = canvas.height - hero1.height - 25;
    hero_frame = hero_frame + 4;
    //jump
    if (direction === 'up') {
        ctx.save();
        if (g >= 0 && g <= 12 && m === 0) {
            g++;
            ctx.translate(0, -g * hero_speed);
            ctx.drawImage(hero1, hero1X, hero1Y);
            ctx.restore();
            if (g >= 12) {
                m = 1;
            }
        } else if (m === 1 && g <= 12 && g > 0) {
            g--;
            ctx.translate(0, -g * hero_speed);
            ctx.drawImage(hero1, hero1X, hero1Y);
            ctx.restore();

        } else if (m === 1 && g < 1) {
            m = 0;
            g = 0;
            direction = '';
            ctx.drawImage(hero1, hero1X, hero1Y);
            ctx.restore();
        }

        if (speed === 0) {
            reset_game();
        }
    } else {
        heroAnimation();
    }
}



function ground_move(ctx) {
    "use strict";
    run_count = run_count - speed;
    ctx.fillStyle = ctx.createPattern(ground, "repeat-x");
    ctx.translate(run_count, canvas.height - ground.height);
    ctx.fillRect(0, 0, canvas.width * 1000, 50);
    ctx.restore();
}
function sky_draw(ctx) {
    "use strict";
    ctx.save();
    ctx.drawImage(sky, 0, 0);
    ctx.restore();
}

function isNumber(n) {
    "use strict";
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function pie_position_calc(num) {
    "use strict";
    if (isNumber(pie_arr[num])) {
        pie_arr[num] = pie_arr[num] - speed;
    } else {
        pie_arr[num] = 0;
    }
    return pie_arr[num];
}

function cloud_position_calc(num) {
    "use strict";
    if (isNumber(cloud_arr[num])) {
        cloud_arr[num] = cloud_arr[num] - speed / 6;
    } else {
        cloud_arr[num] = 0;
        random_cloudY[num] = Math.floor((Math.random() * 200) + 1);
        random_cloud_size[num] = Math.floor((Math.random() * 50) + 1);
    }
    return cloud_arr[num];
}
function random_pie() {
    "use strict";
    var frequency;
    if (isNumber(pie_arr[pie_arr.length - 1]) === false) {
        frequency = 1;
    } else if (pie_arr[pie_arr.length - 1] < -150) {
        frequency = 1;
    } else {
        frequency = 0;
    }
    if (Math.floor((Math.random() * 2) + 1) === 1 && Math.floor((Math.random() * 10) + 1) === 1 && frequency === 1) {
        pie_count++;
    }
}

function random_cloud(ctx) {
    "use strict";
    var random_cloud_frequency = Math.floor((Math.random() * 150) + 1), i;
    if (random_cloud_frequency === 1) {
        cloud_countX++;
    }


    for (i = 0; i < cloud_countX; i++) {
        ctx.save();
        ctx.translate(cloud_position_calc(i), 0);
        ctx.drawImage(cloud, 0, 0, 50, 50, canvas.width + cloud.width + 50, random_cloudY[i], random_cloud_size[i], random_cloud_size[i]);
        ctx.restore();
    }
}
function impact_detection(target_position) {
    "use strict";
    var impact_pie_start = -550;
    if (target_position < impact_pie_start && target_position > impact_pie_start - pie.width && g < 5) {
        speed = 0;
        hero_speed = 0;
    }

}
function pie_draw(ctx) {
    "use strict";
    var i;
    for (i = 0; i < pie_count; i++) {
        ctx.save();
        ctx.translate(pie_position_calc(i), 0);
        if (speed !== 0) {
            ctx.drawImage(pie, canvas.width, 350);
        }
        ctx.restore();
        impact_detection(pie_arr[i]);
    }
}


function writeMessage(context, message) {
    "use strict";
    context.font = '10pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 5, 12);
}


function speed_conrol(pts) {
    "use strict";
    if (pts > incriment) {
        speed = speed + (incriment / 500);
        incriment = incriment + incriment;
    }
}

function points_count(run_pts) {
    "use strict";
    return Math.round((run_pts * -1) / 100);
}

function draw() {
    "use strict";
    screen_points = points_count(run_count);
    speed_conrol(screen_points);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.save(); //save clear canvar on tick


    sky_draw(ctx);
    random_cloud(ctx);


    ground_move(ctx);
    hero_actions(ctx, g);
    random_pie();
    pie_draw(ctx);


    writeMessage(ctx, "Points: " + screen_points);

    window.requestAnimationFrame(draw);
}
init();
