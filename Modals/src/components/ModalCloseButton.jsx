import React, { Component } from 'react';
import styled from 'styled-components';
import { ButtonIcon } from '@vds-core/button-icons';
import { withVDSManager, calculateRem } from '@vds-core/utilities';
import Close from '@vds-core/icons/close';

const IconWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: ${calculateRem(48)};
  height: ${calculateRem(48)};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

/**
 * @ignore
 */
class ModalCloseButton extends Component {
  constructor(props) {
    super(props);
  }

  isFirefox = (() =>
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toLowerCase().indexOf('firefox') > -1)();

  componentDidMount() {
    const closeButtonEle =
      typeof document !== 'undefined'
        ? document.getElementById('modal-close-button')
        : null;
    this.props.hovered &&
      closeButtonEle &&
      setTimeout(() => {
        closeButtonEle.blur();
      }, 0);
  }

  _handleOnKeyUp = e => {
    let scrollView =
      typeof document !== 'undefined'
        ? document.getElementById(`scrollbar-view-${this.props.scrollbarId}`)
        : null;
    if (scrollView) {
      if (e.keyCode === 40) {
        scrollView.style.scrollBehavior = 'auto';
      } else if (e.keyCode === 38) {
        scrollView.style.scrollBehavior = 'auto';
      }
    }

    // Manually remove custom class active for firefox
    if ((e.keyCode === 32 || e.keyCode === 13) && this.isFirefox) {
      let btn =
        typeof document !== 'undefined' &&
        document.getElementById('modal-close-button').classList;
      btn.remove('active');
    }
  };

  _setScrollProperty = offset => {
    let scrollView =
      typeof document !== 'undefined'
        ? document.getElementById(`scrollbar-view-${this.props.scrollbarId}`)
        : null;
    scrollView.style.scrollBehavior = 'smooth';
    scrollView.scrollTop += offset;
  };

  _handleOnKeyDown = e => {
    let scrollView =
      typeof document !== 'undefined'
        ? document.getElementById(`scrollbar-view-${this.props.scrollbarId}`)
        : null;
    let offset = 45;
    if (scrollView) {
      if (e.keyCode === 40) {
        this._setScrollProperty(offset);
      } else if (e.keyCode === 38) {
        this._setScrollProperty(-1 * offset);
      }
    }

    // Do this for firefox for active state because keying down doesn't trigger pseudoclass :active
    // So we add a custom class active then trigger the same effects for pseudoclas :active
    if ((e.keyCode === 32 || e.keyCode === 13) && this.isFirefox) {
      let btn =
        typeof document !== 'undefined'
          ? document.getElementById('modal-close-button').classList
          : null;
      btn.add('active');
    }
  };

  render() {
    let ariaLabel = this.props.ariaLabel
      ? `${this.props.ariaLabel} close`
      : 'Close';

    return (
      <IconWrapper>
        <ButtonIcon
          {...this.props}
          kind="ghost"
          size="small"
          renderIcon={props => <Close {...props} />}
          tabIndex={0}
          id={this.props.id}
          ariaLabel={ariaLabel}
          data-testid="modal-close-button"
          onKeyDown={this._handleOnKeyDown}
          onKeyUp={this._handleOnKeyUp}
        />
      </IconWrapper>
    );
  }
}
export default ModalCloseButton;
