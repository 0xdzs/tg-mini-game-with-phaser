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

        // Add share button if in Telegram
        if (window.Telegram?.WebApp) {
            const shareButton = this.add.text(212, 542, 'Share Score', textStyle)
                .setInteractive()
                .setAlign('center')
                .setOrigin(0.5);
            
            shareButton.on('pointerdown', () => {
                // Use Telegram's share popup
                window.Telegram.WebApp.showPopup({
                    title: 'Share Score',
                    message: `I scored ${score} points in Coin Clicker!`,
                    buttons: [
                        {type: 'default', text: 'Share', id: 'share'},
                        {type: 'cancel'}
                    ]
                }, (buttonId) => {
                    if (buttonId === 'share') {
                        // Use ShareButton API instead of sendMessage
                        window.Telegram.WebApp.openTelegramLink(
                            `https://t.me/share/url?` + 
                            new URLSearchParams({
                                url: window.location.href,
                                text: `🎮 I scored ${score} points in Coin Clicker! Can you beat my score? Play now!`
                            }).toString()
                        );
                    }
                });
            });
        }

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
