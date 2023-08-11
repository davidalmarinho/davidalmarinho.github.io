import { Entity } from "./Entity.js";
import { AssetPool } from "../utils/AssetPool.js";
import { GlobalVariables } from "../utils/GlobalVariables.js";
import { Camera } from "../world/Camera.js";
import { Game } from "../main/Game.js";
import { Player } from "./Player.js";

export class Monitor extends Entity {
  constructor(x, y, width, height, text) {
    super(x, y, width, height);
    this.text = text;
    this.showMsg = false;
    this.alphaIndex = 0;
    this.curTimeToAdvanceIndex = 1;
    this.paragraphs = [];
    this.curParagraph = 0;

    // Animation settings.
    this.frameX = 0;
    this.fps = 0;

    // Organize paragraphs' list --Cheks for '\n' keywords in this.text variable.
    let lastIndex = 0;
    for (let i = 0; i < this.text.length; i++) {
      if (i == this.text.length - 1) {
        this.paragraphs.push(this.text.substring(lastIndex, i + 1));
      }

      const CUR_ALPHA = this.text[i];
      if (CUR_ALPHA == '\n') {
        this.paragraphs.push(this.text.substring(lastIndex, i));
        lastIndex = i;
      }
    }
  }

  tick(keyListener) {
    this.collisionWithPlayer(keyListener);
    this.animMonitor();

    if (this.showMsg) {
      this.animText();
    }
  }

  collisionWithPlayer(keyListener) {
    // Shows text and dialog box if the player is colliding with it and if the
    // player has pressed 'E' key.

    const PRESSED_KEY_FLAG = keyListener.isKeyPressed('e');

    for (let i = 0; i < Game.entitiesList.length; i++) {
      const CUR_ENT = Game.entitiesList[i];
      if (CUR_ENT instanceof Player) {
        if (this.isColliding(CUR_ENT, this)) {
          if (PRESSED_KEY_FLAG) {
            this.showMsg = true;
          }
        }
        else {
          this.resetAnimText();
          this.hideIFrameContainer();
        }
        break;
      }
      else if (CUR_ENT instanceof Monitor) { 
        continue; 
      }
    }
  }

  animMonitor() {
    this.fps++;
    if (this.fps > 15) {
      this.frameX++;
      this.fps = 0;
    }

    if (this.frameX > 1) {
      this.frameX = 0;
    }
  }

  animText() {
    // Animates the text in the dialg boxes.
    this.curTimeToAdvanceIndex++;

    if (this.curTimeToAdvanceIndex < 3) {
      return;
    }
    
    this.curTimeToAdvanceIndex = 0;
    if (this.alphaIndex == this.paragraphs[this.curParagraph].length && this.curParagraph < this.paragraphs.length - 1) {
      this.curParagraph++;
      this.alphaIndex = 0;
      this.curTimeToAdvanceIndex = 0;
    } 
    else if (this.alphaIndex <= this.paragraphs[this.curParagraph].length - 1) {
      this.alphaIndex++;
    }
  }

  resetAnimText() {
    // Reset control variables reponsible for the animation of the text.
    this.showMsg = false;
    this.curTimeToAdvanceIndex = 0;
    this.alphaIndex = 0;
    this.curParagraph = 0;
  }

  draw(ctx) {
    // Render signal.
    ctx.drawImage(AssetPool.museumSpritesheet.image, 
      this.frameX * GlobalVariables.SPRITE_SIZE, 2 * GlobalVariables.SPRITE_SIZE, 
      GlobalVariables.SPRITE_SIZE, GlobalVariables.SPRITE_SIZE, 
      this.x - Camera.x,
      this.y - Camera.y,
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      0, 0
    );
    
    this.zIndex = 0; // Player is in front of Monitor.
    if (!this.showMsg) { return; }
    this.zIndex = 2; // To render the text and the box, Player has to be behind the Monitor.
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, GlobalVariables.GAME_WIDTH, GlobalVariables.GAME_HEIGHT);

    // Render screen.
    const ADJUST_VALUE = 120;
    ctx.fillStyle = "rgba(220, 220, 220, 1)";
    ctx.fillRect(ADJUST_VALUE, ADJUST_VALUE, 
      GlobalVariables.GAME_WIDTH - ADJUST_VALUE * 2, 
      GlobalVariables.GAME_HEIGHT - ADJUST_VALUE * 2);

    // Render text.

    ctx.font = "24px serif";
    ctx.fillStyle = 'black';
    
    // TODO: Allign text to left.
    for (let i = 0; i < this.curParagraph + 1; i++) {
      if (i != this.curParagraph) {
        ctx.fillText(this.paragraphs[i], ADJUST_VALUE * 2, ADJUST_VALUE * 2 + i * GlobalVariables.LINE_SPACING);
      }
      else {
        const SUBSTRING_TEXT = this.paragraphs[i].substring(0, this.alphaIndex);
        ctx.fillText(SUBSTRING_TEXT, ADJUST_VALUE * 2, ADJUST_VALUE * 2 + i * GlobalVariables.LINE_SPACING);
      }
    }

    this.showIFrameContainer(140);
  }

  showIFrameContainer(pxMoveBellowCenter) {
    // Get the iframe element.
    const iframeContainer = document.getElementById('iframeContainer');

    // Unhide iframe
    const iframe = document.getElementById('iframe');
    iframe.width = GlobalVariables.IFRAME_WIDTH;
    iframe.height = GlobalVariables.IFRAME_HEIGHT;
    iframeContainer.style.width = GlobalVariables.IFRAME_WIDTH;
    iframeContainer.style.height = GlobalVariables.IFRAME_HEIGHT;
    iframeContainer.style.display = 'flex';

    // Reposition of iframe a little bellow from the center.
    var movement = pxMoveBellowCenter;
    iframeContainer.style.top = "calc(50% + " + movement + "px)";
  }

  hideIFrameContainer() {
    // Get the iframe element.
    const iframe = document.getElementById('iframeContainer');

    // Hide iframe
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.display = 'none';
  }
}