import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import PropTypes from 'prop-types';

import './ReactCrop.scss';
import './react-custom-crop.scss';

const HANDLE_WIDTH = 39;
const HIDE_HANDLE_PADDING = 5;
const MIN_WIDTH_TO_HIDE_HANDLES = (HANDLE_WIDTH * 3) + HIDE_HANDLE_PADDING;
const MIN_WIDTH_TO_HIDE_CORNER_HANDLES = (HANDLE_WIDTH * 2) + HIDE_HANDLE_PADDING;

class ReactCustomCrop extends Component {

    static propTypes = {
      src: PropTypes.string.isRequired,
      crop: PropTypes.instanceOf(Object).isRequired,
      onChange: PropTypes.func.isRequired,
      minWidth: PropTypes.number.isRequired,
      minHeight: PropTypes.number.isRequired,
    }
  
    createHandle(type) {
      const handle = document.createElement('div');
      handle.classList.add('ReactCrop__drag-handle');
      handle.classList.add('second-handle');
      handle.classList.add(`ord-${type}`);
      handle.setAttribute('data-ord', type);
      return handle;
    }
  
    onChange = (crop) => {
      this.props.onChange(crop);
      this.checkHandles(crop);
    }
  
    createHandles() {
      const el = this.reactCrop.cropSelectRef.firstChild;
      el.appendChild(this.createHandle('nw'));
      el.appendChild(this.createHandle('ne'));
      el.appendChild(this.createHandle('se'));
      el.appendChild(this.createHandle('sw'));
    }
  
    componentDidMount() {
      this.createHandles();
    }
  
    hasHandles() {
      return this.reactCrop && this.reactCrop.cropSelectRef && this.reactCrop.cropSelectRef.firstChild;
    }
  
    componentDidUpdate() {
      // re-create the handles, in case they were removed
      if (this.hasHandles()) {
        const el = this.reactCrop.cropSelectRef.firstChild;
        if (!el.querySelector('.second-handle')) {
          this.createHandles();
        }
      }
    }

    toggleDisplay(handles, hide) {
      handles.forEach(handle => {
        handle.style.display = hide ? 'none' : 'block';
      });
    }
  
    checkHandles(crop) {
      if (this.hasHandles()) {
        const { componentRef, cropSelectRef } = this.reactCrop;

        const imageWidth = componentRef.clientWidth;
        const imageHeight = componentRef.clientHeight;

        const widthInPixels = (imageWidth / 100) * crop.width;
        const heightInPixels = (imageHeight / 100) * crop.height;
  
        const hideNorthSouthHandles = widthInPixels < MIN_WIDTH_TO_HIDE_HANDLES;
        const hideWestEastHandles = heightInPixels < MIN_WIDTH_TO_HIDE_HANDLES;
  
        const hideAllCornerHandles = widthInPixels < MIN_WIDTH_TO_HIDE_CORNER_HANDLES || heightInPixels < MIN_WIDTH_TO_HIDE_CORNER_HANDLES;
  
        const el = cropSelectRef.firstChild;
  
        const northSouthHandles = el.querySelectorAll('.ReactCrop__drag-handle.ord-n, .ReactCrop__drag-handle.ord-s');
        this.toggleDisplay(northSouthHandles, hideNorthSouthHandles);
  
        const westEashHandles = el.querySelectorAll('.ReactCrop__drag-handle.ord-w, .ReactCrop__drag-handle.ord-e');
        this.toggleDisplay(westEashHandles, hideWestEastHandles);
  
        const allCornerHandles = el.querySelectorAll('.ReactCrop__drag-handle.ord-nw, .ReactCrop__drag-handle.ord-ne, .ReactCrop__drag-handle.ord-se, .ReactCrop__drag-handle.ord-sw, .ReactCrop__drag-handle.second-handle');
        this.toggleDisplay(allCornerHandles, hideAllCornerHandles);
      }
    }
  
    render() {
      return (
        <div className='react-custom-crop'>
          <ReactCrop
            src={this.props.src}
            crop={this.props.crop}
            onChange={this.onChange}
            ref={(c) => this.reactCrop = c}
            minWidth={this.props.minWidth}
            minHeight={this.props.minHeight}
            keepSelection
          >
            </ReactCrop>
        </div>
      );
    }

};

export default ReactCustomCrop;