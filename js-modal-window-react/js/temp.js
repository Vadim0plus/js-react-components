class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup',this.handleKeyUp,false);
        document.addEventListener('click', this.handleOutsideClick,false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup',this.handleKeyUp,false);
        document.removeEventListener('click', this.handleOutsideClick,false);
    }

    handleKeyUp(e) {
        const {onCloseRequest} = this.props;
        if(e.keyCode == 27) {
            e.preventDefault();
            onCloseRequest();
            window.removeEventListener('keyup', this.handleKeyUp, false);
        }
    }

    handleOutsideClick(e) {
        const {onCloseRequest} = this.props;
            if(this.modalContent && !this.modalContent.contains(e.target)) {
                onCloseRequest();
                document.removeEventListener('click', this.handleOutsideClick,false);
        }
    }

    render() {
        const {onCloseRequest, children } = this.props;

        return(
            <div className="modalOverlay">
                <div className="modal">
                    <div className="modalContent" ref={node => (this.modalContent = node)}>
                        <span className="closeButton" onClick={onCloseRequest}>&times;</span>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

class ModalWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    handleToggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        const {showModal} = this.state;

        return(
            <div>
                <button
                    type="button"
                    className="modalButton"
                    onClick={() => this.handleToggleModal()}>
                    Open Modal
                </button>
                {showModal &&
                    <Modal onCloseRequest={() => this.handleToggleModal()}>
                        <div className="modal-header">
                            <h2>Modal Header</h2>
                        </div>
                        <div className="modal-body">
                            <p>Some text in the Modal Body</p>
                            <p>Some other text...</p>
                        </div>
                        <div className="modal-footer">
                            <h3>Modal Footer</h3>
                        </div>
                    </Modal>}
            </div>
        );
    }
}

const App = () => {
    return(
    <div>
        <h2>Animated Modal with Header and Footer</h2>
        <ModalWindow />
    </div>
    );
};

ReactDOM.render(<App />,document.getElementById('react'));
