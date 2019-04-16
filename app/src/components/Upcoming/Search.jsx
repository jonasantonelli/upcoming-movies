import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.search = React.createRef();
        this.handleCleaning = this.handleCleaning.bind(this);
    }

    handleCleaning() {
        this.props.onCleaning();
        this.search.current.value = '';
        this.search.current.focus();
    }

    render() {
        const { onChange } = this.props;
        return (
            <div className="search">
                <div className="search__input">
                    <input onKeyPress={onChange} type="text" ref={this.search} onChange={onChange} placeholder="Titles" name="search"/>
                </div>
                <button type="button" onClick={this.handleCleaning}>Clean</button>
            </div>
        );
    }
}

Search.defaultProps = {
    onChange: () => {},
    onCleaning: () => {},
};

Search.propTypes = {
    onChange: PropTypes.func,
    onCleaning: PropTypes.func,
};

export default Search;
