import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import TooltipPortal from './TooltipPortal';
import TooltipDialogOverlay from './TooltipDialogOverlay';
import { calculateRem, withVDSManager } from '@vds-core/utilities';
import { Fonts, Body } from '@vds-core/typography';
import { ColorTokens } from '@vds-tokens/color';
import { TypographyTokens } from '@vds-tokens/typography';
import screenReader from './util/screen-reader';

const propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  closeButtonText: PropTypes.string,
  onClick: PropTypes.func,
  dialogOpened: PropTypes.bool,
  unmounted: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,
  closeButtonText: 'Close',
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

const dialogFadeIn = () => keyframes`
  0% {
    opacity: 0;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const dialogFadeOut = () => keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

function _calcAnimation(animation) {
  if (animation === 'in') {
    return dialogFadeIn();
  } else {
    return dialogFadeOut();
  }
}
/**
 * @ignore
 */
const Dialog = styled.div`
  padding-top: 16px;
  background-color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.background.primary.dark.value
      : ColorTokens.background.primary.light.value};
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  flex-flow: column-reverse nowrap;
  justify-content: space-between;
  min-height: ${calculateRem(96)};
  max-height: ${calculateRem(312)};
  position: relative;
  width: ${calculateRem(296)};
  outline: none;
  z-index: 1000;
  border-radius: 8px;
  ${({ dialogOpened, disableAnimation }) =>
    dialogOpened &&
    !disableAnimation &&
    css`
      animation: 0.2s cubic-bezier(0.37, 0, 0.63, 1) both 0s
        ${_calcAnimation('in')};
    `};

  ${({ unmounted, disableAnimation }) =>
    unmounted &&
    !disableAnimation &&
    css`
      animation: 0.1s cubic-bezier(0.37, 0, 0.63, 1) both 0s
        ${_calcAnimation('out')};
    `};
`;

const StyledHeading = styled.span`
  display: flex;
  max-width: 100%;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  font-family: ${Fonts.VerizonNHGeDS};
  font-size: ${TypographyTokens.fontsize.title[20].value};
  line-height: ${TypographyTokens.lineheight.title[24].value};
  font-weight: ${TypographyTokens.fontweight.bold.value};
  padding-bottom: 8px;
  margin: 0;
`;

const StyledBody = styled.span`
  display: flex;
  width: 100%;
  color: ${({ surface }) =>
    surface === 'dark'
      ? ColorTokens.elements.primary.ondark.value
      : ColorTokens.elements.primary.onlight.value};
  font-family: ${Fonts.VerizonNHGeDS};
  font-size: ${TypographyTokens.fontsize.title[16].value};
  line-height: ${TypographyTokens.lineheight.title[20].value};
  letter-spacing: ${TypographyTokens.letterspacing.wide.value};
  padding-bottom: 16px;
`;

const DialogWrapper = styled.div`
  display: flex;
  overflow-y: scroll;
  padding: 0px 16px 0px 16px;
  border-bottom: ${calculateRem(1)} solid
    ${({ surface }) =>
      surface === 'dark'
        ? ColorTokens.elements.lowcontrast.ondark.value
        : ColorTokens.elements.lowcontrast.onlight.value};
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-height: calc(312px - 44px - 16px - 1px);
  word-break: break-word;
`;

const TooltipButton = styled.button`
  display: flex;
  width: 100%;
  height: ${calculateRem(44)};
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  position: relative;
  outline: none;
`;

const ButtonTextContainer = styled.span`
  position: relative;
`;

/**
 * @ignore
 */
class TooltipDialog extends Component {
  state = {
    expandedStateText: 'expanded! ', //added this state to announce expanded state once the modal opened.
  };

  componentDidMount() {
    this.props.isAndroidDevice && screenReader.OpenDialog();
    setTimeout(() => {
      this.setState({
        expandedStateText: '',
      });
    }, 500);
  }

  componentWillUnmount() {
    this.props.isAndroidDevice && screenReader.CloseDialog();
  }

  render() {
    const {
      title,
      body,
      onClick,
      surface,
      closeButtonText,
      dialogOpened,
      unmounted,
      dialogId,
    } = this.props;

    return (
      <TooltipPortal>
        <Wrapper>
          <FocusLock disabled={false} returnFocus>
            <TooltipDialogOverlay
              dialogOpened={dialogOpened}
              opened={dialogOpened}
              surface={surface}
              viewport="desktop"
              unmounted={unmounted}
            >
              <Dialog
                surface={surface}
                dialogOpened={dialogOpened}
                unmounted={unmounted}
                id={dialogId}
                role="dialog"
                aria-modal={true}
              >
                <TooltipButton
                  surface={surface}
                  onClick={onClick}
                  aria-label={`${this.state.expandedStateText}${closeButtonText}`}
                >
                  <ButtonTextContainer>
                    <Body
                      size="large"
                      viewport="mobile"
                      color={
                        surface === 'dark'
                          ? ColorTokens.elements.primary.ondark.value
                          : ColorTokens.elements.primary.onlight.value
                      }
                    >
                      {closeButtonText}
                    </Body>
                  </ButtonTextContainer>
                </TooltipButton>
                <DialogWrapper surface={surface}>
                  <ContentContainer>
                    {!!title && (
                      <StyledHeading surface={surface}>{title}</StyledHeading>
                    )}
                    <StyledBody surface={surface}>{body}</StyledBody>
                  </ContentContainer>
                </DialogWrapper>
              </Dialog>
            </TooltipDialogOverlay>
          </FocusLock>
        </Wrapper>
      </TooltipPortal>
    );
  }
}

TooltipDialog.propTypes = propTypes;
TooltipDialog.defaultProps = defaultProps;

export default withVDSManager(TooltipDialog);
