namespace SpriteKind {
    export const Cleaner = SpriteKind.create();
};

let speed = 100;

let dookie: Sprite = null;
let kid = sprites.create(assets.image`kid`, SpriteKind.Player);
controller.player1.moveSprite(kid, 100 * speed, 100 * speed);
kid.setPosition(25, 25);
tiles.setTilemap(tilemap`level1`);
info.setScore(0);
info.setLife(5);
let janitor = sprites.create(assets.image`janitor`, SpriteKind.Cleaner);
let dookies = [dookie];
let teacher = sprites.create(assets.image`teacher`, SpriteKind.Enemy);
teacher.setPosition(500, 500);
teacher.follow(kid, 25 * speed, 50 * speed);
let time = (game.runtime() / 1000) + randint(5, 15) / speed;

for (let index = 0; index < 25; index++) {
    dookie = sprites.create(assets.image`dookie`, SpriteKind.Food);
    dookie.setPosition(randint(0, 512), randint(0, 512));
    dookies.push(dookie);
};

forever(function () {
    if (kid.right >= scene.cameraProperty(CameraProperty.Right)) {
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X) + (kid.right - scene.cameraProperty(CameraProperty.Right)), scene.cameraProperty(CameraProperty.Y));
    };
    if (kid.left <= scene.cameraProperty(CameraProperty.Left)) {
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X) - (scene.cameraProperty(CameraProperty.Left) - kid.left), scene.cameraProperty(CameraProperty.Y));
    };
    if (kid.bottom >= scene.cameraProperty(CameraProperty.Bottom)) {
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + (kid.bottom - scene.cameraProperty(CameraProperty.Bottom)));
    };
    if (kid.top <= scene.cameraProperty(CameraProperty.Top)) {
        scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - (scene.cameraProperty(CameraProperty.Top) - kid.top));
    };
    if ((game.runtime() / 1000) >= time) {
        time = (game.runtime() / 1000) + randint(5, 15) / speed;
        dookie = sprites.create(assets.image`dookie`, SpriteKind.Food);
        dookie.setPosition(randint(0, 512), randint(0, 512));
        dookies.push(dookie);
    };
    janitor.follow(dookies[1], 25 * speed, 50 * speed);
});

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    dookies.removeElement(otherSprite);
    otherSprite.destroy();
    info.player1.changeScoreBy(1);
});
sprites.onOverlap(SpriteKind.Cleaner, SpriteKind.Food, function (sprite, otherSprite) {
    dookies.removeElement(otherSprite);
    otherSprite.destroy();
    info.player1.changeScoreBy(1);
});