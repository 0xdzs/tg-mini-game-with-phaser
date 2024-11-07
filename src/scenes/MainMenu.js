import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //  Get the current highscore from the registry
        // which stores shared data across scenes.
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff', stroke: '#000000', strokeThickness: 6 };

        this.add.image(212, 442, 'background');

        // Create the logo with a smaller scale and lower position
        const logo = this.add.image(212, -100, 'logo');
        logo.setScale(0.4); // Reduce the size to 40% of original

        this.tweens.add({
            targets: logo,
            y: 200, // Position it lower on the screen
            duration: 1000,
            ease: 'Bounce'
        });

        this.add.text(20, 20, `High Score: ${score}`, textStyle);

        const instructions = [
            'How many coins can you',
            'click in 10 seconds?',
            '',
            'Click to Start!',
            'Github -> Vercel Automation Test'
        ]

        this.add.text(212, 442, instructions, textStyle).setAlign('center').setOrigin(0.5);

        // Waits for the player to click/tap the screen
        this.input.once('pointerdown', () => {

            this.scene.start('ClickerGame');

        });
    }
}
