export default class HistoryRouter extends React.Component {
    state = {
        currentPath: utils.extractUrlPath(window.location.href),
    };

    onPopState = (e) => {
        const currentPath = utils.extractUrlPath(window.location.href);
        console.log("onPopState:", currentPath);
        this.setState({ currentPath });
    };
    componentDidMount() {
        window.addEventListener("popstate", this.onPopState);
    }

    componentWillUnmount() {
        window.removeEventListener("popstate", this.onPopState);
    }

    render() {
        return (
            <RouteContext.Provider
                value={{
                    currentPath: this.state.currentPath,
                    onPopState: this.onPopState,
                }}
            >
                {this.props.children}
            </RouteContext.Provider>
        );
    }
}

function Route({ path, render }) {
    return (
        <RouteContext.Consumer>
            {({ currentPath }) => currentPath === path && render()}
        </RouteContext.Consumer>
    );
}

function Link({ to, ...props }) {
    <RouteContext.Consumer>
        {({ onPopState }) => (
            <a
                href=""
                {...props}
                onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, "", to);
                    onPopState();
                }}
            />
        )}
    </RouteContext.Consumer>;
}
