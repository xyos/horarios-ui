var React = require('react');
var ReactPropTypes = React.PropTypes;
var Colors = require('../constants/Colors');

var ScheduleThumbnail = React.createClass({

    draw : function (context, schedules, x, y, lineWidth) {

      function roundedRect(x, y, w, h, r, context) {
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w - r, y);
        context.quadraticCurveTo(x + w, y, x + w, y + r);
        context.lineTo(x + w, y + h - r);
        context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        context.lineTo(x + r, y + h);
        context.quadraticCurveTo(x, y + h, x, y + h - r);
        context.lineTo(x, y + r);
        context.quadraticCurveTo(x, y, x + r, y);
      }


      context.fillStyle = 'white';
      context.lineWidth = lineWidth;
      context.strokeStyle = 'gray';
      roundedRect(x, y, this.props.w, this.props.h, 10, context);
      context.fill();
      context.stroke();
      var dayWidth = this.props.w / 7.0;
      var hourHeight = this.props.h / 24.0;

      context.lineWidth = 0;
      for (var s in schedules) {

        var lx = x;
        var ly = y;
        context.beginPath();
        context.fillStyle = schedules[s]['color'].hex;
        for (var t in schedules[s]['_schedule']) {
          var hours = schedules[s]['_schedule'][t];
          ly = y;
          for (var h in hours) {
            if (hours[h] == '1') {
              context.rect(lx, ly, dayWidth, hourHeight);
              context.fill();
            }
            ly += hourHeight;
          }
          lx += dayWidth;
          context.fill();
        }
      }
      context.linWidth = lineWidth;
      context.beginPath();
      context.lineWidth = lineWidth / 2;
      for (var i = 1; i < 7; i++) {
        context.moveTo(x + (i * dayWidth), y);
        context.lineTo(x + (i * dayWidth), y + this.props.h);
        context.stroke();
      }
      context.moveTo(x, y + this.props.h / 2);
      context.lineTo(x + this.props.w, y + this.props.h / 2);
      context.stroke();
    },

      color : {
        'turquoise': '#1abc9c',
        'emerland': '#2ecc71',
        'peter-river': '#3498db',
        'amethyst': '#9b59b6',
        'wet-asphalt': '#34495e',
        'green-sea': '#16a085',
        'nephritis': '#27ae60',
        'belize-hole': '#2980b9',
        'wisteria': '#8e44ad',
        'midnight-blue': '#2c3e50',
        'sun-flower': '#f1c40f',
        'carrot': '#e67e22',
        'alizarin': '#e74c3c',
        'clouds': '#ecf0f1',
        'concrete': '#95a5a6',
        'orange': '#f39c12',
        'pumpkin': '#d35400',
        'pomegranate': '#c0392b',
        'silver': '#bdc3c7',
        'asbestos': '#7f8c8d'},

  /**
   * @return {object}
   */
  canvas : document.createElement('canvas'),
  render: function() {
    this.canvas.width = 110;
    this.canvas.height = 55;
    this.draw(this.canvas.getContext('2d'),
                this.props.groups, 
                1, 1, 0.5);
    content = this.canvas.toDataURL();
    return (
      <img src={content}/>
    );
  }
});

module.exports = ScheduleThumbnail;
