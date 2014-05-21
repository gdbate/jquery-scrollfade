# jquery.scrollfade #

### version 0.1.4 ###

----------

An auto-hiding customizable scroll bar plugin that supports native scrolling/mousewheel/touch (work in progress).

This was done on a Sunday and hasn't been tested a lot, I wouldn't recommend for production.

![example showing scrollbar](https://raw.githubusercontent.com/gdbate/jquery-scrollfade/master/example.png)

## Installation ##

```html
<link href="/path/to/jquery.scrollfade.css" rel="stylesheet" type="text/css">
<script src="/path/to/jquery.scrollfade.js"></script>
```

## Usage ##

```javascript
$('.window').scrollfade();
```
*This does support multiple scrollable items on one page.*

## Examples ##

Check out the examples in the /examples folder:

**add-content.html** *dynamically adds content and demos a window with little content*

**div-image.html** *absolute positioned div with an image that is persisted.*

**matrix.html** *a bit of a load test*

**table.html** *a relatively positioned div inside a TD for positioning*

**themed.html** *an example of theming scrollfade*


## Configuration Variables ##

**arrow-color** default: 'black'

*arrow colors, use 'black' or 'white'*

----------

**click-scroll** default: 100

*amount of pixels the arrow buttons scroll up or down*

----------

**time-fade-in** default: 100

*amount of milliseconds it takes for the scroll bar to fade in when required*

----------

**time-fade-out** default: 200

*amount of milliseconds it takes for the scroll bar to fade out when cursor leaves window*

----------

**delay-fader** default: 200

*milliseconds to wait before fading out the scroll bar due to inactivity*

----------

**animate-multiplier** default: 0

*use if you want to animate the scrolling when the arrow button is clicked. If you want to use it I recommend 1, which will wait 100 milliseconds to scroll 100 pixels. 2 would wait 200 milliseconds to scroll 100 pixels. leave as 0 to not animate.*


## Using Configuration ##

```javascript

$('.window').scrollfade({
  'animate-multiplier':1,
  'click-scroll':200
});

//this would scroll the page 200 pixels whent he up or down arrows are clicked and take 200ms to animate the scroll

```

## Changing Content ##

Sometimes you want to change the content inside a scrollable window.  Rather than using JQuery's html/append/prepend use the plugins:

```javascript

$('.window').scrollfade('html','I am a');
$('.window').scrollfade('append','cow!');
$('.window').scrollfade('prepend','Hello, ');

```

Some other useful methods:

```javascript

//trigger activity so the scroll bar appears fir a bit
$('.window').scrollfade('fader');

//adjust the thumb position in the track based on the scrolled position of the window:
$('.window').scrollfade('position');

```


## Customizing CSS ##

**Note:** The scroll bar floats on top of the content. Position it wherever relative to the content window.

**Useful CSS Paths**

The up and down buttons (with the arrow image placed):
```css
.scroll-fade-button{
}
.scroll-fade-up{
}
.scroll-fade-down{
}
```

The full track for the scroll bar (do not overlap with buttons):
```css
.scroll-fade-track{
}
```

The thumb/slider inside the track to display where we are on the page:
```css
.scroll-fade-thumb{
}
```

**Note:** There are some examples and notes in the CSS file you can check out.

## Nested ##

Please do not put nested scrollable windows in each other, it will have unexpected results.

## Browser Support ##

Current browsers supported, not sure how far back..

## Known Bugs ##

- Mouse controlling the slider sometimes gets weird
- When there is a margin on the top or bottom of the content the height calcuation is a bit off.

## Todo ##

- known bugs with mouse controlling the slider
- touch support
- Better examples & testing
- Neseted windows
- Horizontal scrolling (meh)


----------

----------

-Greg Bate