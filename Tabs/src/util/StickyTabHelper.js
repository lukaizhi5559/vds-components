const resize = (event, tabs) => {
  const { stickyTabs } = tabs.props;
  if (stickyTabs) {
    tabs.setState({
      windowHeight: typeof window !== 'undefined' && window.innerHeight,
    });
  }
};

const watchTabs = (event, tabs) => {
  const { windowHeight, stickToBottom } = tabs.state;
  if (tabs.stickyWrapper && tabs.contentWrapperRef) {
    const tabsDiff = tabs.stickyWrapper.offsetHeight - windowHeight;
    const contentScrollY = tabs.contentWrapperRef.getBoundingClientRect().y;
    if (contentScrollY >= -tabsDiff && stickToBottom) {
      tabs.setState({
        stickToBottom: false,
        stickToTop: true,
      });
    }
  }
};

const observeEntrance = (container, tabsDiff, tabs) => {
  const { stickyTabs } = tabs.props;
  const { windowHeight, stickToBottom, stickToTop } = tabs.state;
  const threshold = windowHeight / container.offsetHeight;

  const tabObserver = new IntersectionObserver(
    (records, observer) => {
      for (const record of records) {
        if (record.isIntersecting && !tabs.previousIntersection) {
          tabs.previousIntersection = record.isIntersecting;
          //hit bottom edge of content
          if (
            Math.abs(record.boundingClientRect.top) >
            record.intersectionRect.height
          ) {
            if (!stickToBottom && !stickToTop) {
              if (
                tabs.stickyWrapper.offsetHeight - typeof window !==
                  'undefined' &&
                window.innerHeight < 0
              )
                return;
              tabs.setState({
                stickToBottom: true,
              });
            }
          }
        } else if (!record.isIntersecting && tabs.previousIntersection) {
          tabs.setState({ stickToTop: false, stickToBottom: false });
          tabs.previousIntersection = false;
        }
      }
    },
    { threshold: threshold }
  );
  tabs.tabObserver = tabObserver;
  return tabObserver.observe(container);
};

export { resize, watchTabs, observeEntrance };
