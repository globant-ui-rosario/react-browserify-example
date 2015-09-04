// VENDOR LIBS
var React = require('react');
var classNames = require('classnames');

// COMPONENTS
var Checkbox = require('../components/checkbox');
var FormGroup = require('../components/form-group');
var Input = require('../components/input');
var ProductsTable = require('../components/products-table');

var StoreProducts = React.createClass({

    propTypes: {
        products: React.PropTypes.arrayOf(React.PropTypes.shape({
            category: React.PropTypes.string.isRequired,
            price: React.PropTypes.number.isRequired,
            stocked: React.PropTypes.bool,
            name: React.PropTypes.string.isRequired
        }))
    },

    getDefaultProps: function () {
        return {
            products: []
        };
    },

    getInitialState: function () {
        return {
            filterText: '',
            showOnlyStockedProducts: false
        };
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                {this.renderFilterSection()}
                {this.renderProductsList()}
            </div>
        );
    },

    renderFilterSection: function () {
        return (
            <div className="row" >
                <div className="col-md-6 col-md-offset-3">
                    {this.renderFilterInput()}
                    {this.renderStockOnlyCheckbox()}
                </div>
            </div>
        );
    },

    renderFilterInput: function () {
        return (
            <FormGroup>
                <Input {...this.getInputProps()}/>
            </FormGroup>
        );
    },

    renderStockOnlyCheckbox: function () {
        return (
            <FormGroup>
                <Checkbox {...this.getCheckboxProps()}>Show only stocked items</Checkbox>
            </FormGroup>
        );
    },

    renderProductsList: function () {
        return (
            <div className="row" >
                <div className="col-md-6 col-md-offset-3">
                    <ProductsTable filter={this.state} products={this.props.products} />
                </div>
            </div>
        );
    },

    getProps: function () {
        return {
            className: this.getClass()
        };
    },

    getInputProps: function () {
        return {
            value: this.state.filterText,
            onChange: this.handleInputChange
        };
    },

    getCheckboxProps: function () {
        return {
            checked: (this.state.showOnlyStockedProducts),
            onChange: this.handleCheckboxChange
        };
    },

    getClass: function () {
        var classes = {
            'store-products': true,
            'container': true
        };

        return classNames(classes);
    },

    getFilterSectionClass: function () {
        var classes = {
            'col-md-6 col-md-offset-3': true
        };

        return classNames(classes);
    },

    handleInputChange: function (event) {
        this.setState({filterText: event.target.value});
    },

    handleCheckboxChange: function () {
        this.setState({showOnlyStockedProducts: !this.state.showOnlyStockedProducts});
    }


});

module.exports = StoreProducts;