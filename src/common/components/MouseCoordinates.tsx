import React from 'react';
import withHMR from './withHMR';

type TRenderCallback = (coordinates: ICoordinates) => JSX.Element | null;

const initialState = { x: 0, y: 0 };
const defaultProps = {
    children: (() => null) as TRenderCallback,
};

type TDefaultProps = typeof defaultProps;
type TProps = Readonly<{ children?: TRenderCallback } & TDefaultProps>;
type TState = Readonly<ICoordinates>;

class MouseCoordinates extends React.Component<TProps, TState> {
    static readonly defaultProps: TDefaultProps = defaultProps;
    readonly state: TState = initialState;

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (event: MouseEvent): void => {
        const { screenX = 0, screenY = 0 } = event;

        window.requestAnimationFrame(() => {
            this.setState(() => ({
                x: screenX,
                y: screenY,
            }));
        });
    };

    render() {
        const { children } = this.props;
        const isRenderIsFunction = typeof this.props.children === 'function';

        return isRenderIsFunction ? children(this.state) : null;
    }
}

export default withHMR(MouseCoordinates);
