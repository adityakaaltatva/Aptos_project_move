// SPDX-License-Identifier: MIT
module ClickGame {
    struct ClickGame {
        clickCount: u256,
    }

    struct ButtonClickedEvent {
        clicks: u256,
    }

    public fun clickButton(game: &mut ClickGame) {
        game.clickCount += 1;
        emit ButtonClickedEvent { clicks: game.clickCount };
    }

    public fun getClickCount(game: &ClickGame) -> u256 {
        return game.clickCount;
    }
}
