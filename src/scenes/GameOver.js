import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        const score = this.registry.get('highscore');
        const textStyle = { fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(212, 442, 'background');
        this.add.text(212, 442, `Game Over\n\nHigh Score: ${score}`, textStyle).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
