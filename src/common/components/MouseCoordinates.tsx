import React, { MouseEvent } from 'react';
import withHMR from './withHMR';

type TRenderCallback = (coordinates: ICoordinates) => JSX.Element | null;
type TState = Readonly<ICoordinates>;
type TProps = {
    children?: TRenderCallback;
} & typeof defaultProps;

const initialState = { x: 0, y: 0 };
const defaultProps = {
    children: (() => null) as TRenderCallback,
};

class MouseCoordinates extends React.Component<TProps, TState> {
    static readonly defaultProps: TProps = defaultProps;
    readonly state: TState = initialState;

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (event: MouseEvent<HTMLElement>): void => {
        const { screenX = 0, screenY = 0 } = event;

        this.setState(() => ({
            x: screenX,
            y: screenY,
        }));
    };

    render() {
        const { children } = this.props;
        const isRenderIsFunction = typeof this.props.children === 'function';

        return isRenderIsFunction ? children(this.state) : null;
    }
}

export default withHMR(MouseCoordinates);
