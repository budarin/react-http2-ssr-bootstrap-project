import React from 'react';

export type TMouseEventRenderer = (coordinates: ICoordinates) => JSX.Element | null;

const initialState = { x: 0, y: 0 };
type TProps = Readonly<{ children: TMouseEventRenderer }>;
type TState = Readonly<ICoordinates>;

class MouseCoordinates extends React.Component<TProps, TState> {
    readonly state: TState = initialState;

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (event: MouseEvent): void => {
        const { clientX = 0, clientY = 0 } = event;

        window.requestAnimationFrame(() => {
            this.setState(() => ({
                x: clientX,
                y: clientY,
            }));
        });
    };

    render() {
        const { children } = this.props;
        const isRenderIsFunction = typeof this.props.children === 'function';

        return isRenderIsFunction ? children(this.state) : null;
    }
}

export default MouseCoordinates;
