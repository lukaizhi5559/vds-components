declare module '@vds-core/carousels' {
  interface ViewportOverride {
    layout?: string | number;
    peek?: 'standard' | 'minimum' | 'none';
    gutter?: string;
    aspectRatio?: string;
    surface?: 'light' | 'dark';
    paginationFill?: 'light' | 'dark';
    paginationInset?: string;
    paginationDisplay?: 'onHover' | 'persistent' | 'none';
    hidePaginationBorder?: boolean;
  }

  export function Carousel(props: CarouselProps): React.ReactElement;
  type CarouselProps = {
    renderItem: Function;
    selectedIndex?: number;
    viewport?: 'desktop' | 'tablet' | 'tabletLarge' | 'mobile' | 'mobileLarge';
    layout?: string | number;
    peek?: 'standard' | 'minimum' | 'none';
    gutter?: string;
    aspectRatio?: string;
    surface?: 'light' | 'dark';
    paginationFill?: 'light' | 'dark';
    paginationInset?: string;
    paginationDisplay?: 'onHover' | 'persistent' | 'none';
    hidePaginationBorder?: boolean;
    'data-analyticstrack'?: string;
    'data-track'?: string;
    'data-track-ignore'?: string;
    'data-clickstream'?: string;
    viewportOverride?: {
      mobile?: ViewportOverride;
      mobileLarge?: ViewportOverride;
      tablet?: ViewportOverride;
      tabletLarge?: ViewportOverride;
      desktop?: ViewportOverride;
    };
    data?: Array<any>;
    onChange?: (e: React.MouseEvent, selectedGroupIndex: number) => void;
    slotAlignment?: {
      vertical: 'top' | 'middle' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
  };

  export function CarouselBars(props: CarouselBarsProps): React.ReactElement;
  type CarouselBarsProps = {
    id?: string;
    uniqueId: string;
    ariaLabel?: string;
    slideCount: Number;
    onChange?: Function;
    'data-analyticstrack'?: string;
    'data-track'?: string;
    'data-track-ignore'?: string;
    'data-clickstream'?: string;
    slideAriaLabel?: Function;
  };

  export function CarouselIndicator(
    props: CarouselIndicatorProps
  ): React.ReactElement;
  type CarouselIndicatorProps = {
    type?: 'bars' | 'scrubber';
  };

  export function CarouselScrubber(
    props: CarouselScrubberProps
  ): React.ReactElement;
  type CarouselScrubberProps = {
    numberOfSlides: number | string;
    onMoveForward?: Function;
    onMoveBackward?: Function;
    onThumbMouseDown?: Function;
    onThumbMouseUp?: Function;
    onThumbTouchStart?: Function;
    onThumbTouchEnd?: Function;
    onScrubberDrag?: Function;
    layout?: string | number;
    scrubberId?: string;
    position?: number;
    updateCarouselFocus?: Function;
    'data-analyticstrack'?: string;
    'data-track'?: string;
    'data-track-ignore'?: string;
    'data-clickstream'?: string;
  };

  export function PaginationControl(
    props: PaginationControlProps
  ): React.ReactElement;
  type PaginationControlProps = {
    id?: string;
    className?: string;
    position?: 'left' | 'right';
    ariaHidden?: boolean;
    tabIndex?: number;
    viewport?: 'mobile' | 'mobileLarge' | 'tablet' | 'tabletLarge' | 'desktop';
    hidePaginationBorder?: boolean;
    paginationFill?: 'light' | 'dark';
    onClick?: Function;
    onKeyDown?: Function;
    getPaginationInset?: Function;
    'data-analyticstrack'?: string;
    'data-track'?: string;
    'data-track-ignore'?: string;
    'data-clickstream'?: string;
  };
}
