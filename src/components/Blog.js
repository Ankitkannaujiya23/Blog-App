import React, { Component } from 'react'
import BlogItem from './BlogItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class Blog extends Component {

    static defaultProps = {
        country: 'in',
        pagesize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }
     capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title=`SKSolutions- ${this.capitalizeFirstLetter(this.props.category)}`
    }

    //Making update function which makes our code optimized and reuseble

    // async updateBlog() {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1c0fd91474548318a8b71bc2252633b&page=1&pagesize=${this.props.pagesize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     })

    // }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1c0fd91474548318a8b71bc2252633b&page=1&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    clickPrevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1c0fd91474548318a8b71bc2252633b&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
// I comment these line bcoz i got new method to reuse function which make me less coding

    }
    clickNext = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1c0fd91474548318a8b71bc2252633b&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({ articles: parsedData.articles })
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false

            })
        }
// for this we can call update function which make less code 
      

    }
    render() {
        return (

            <div className="container  my-3">
                <h2 className="text-center my-4">Blog Post From - {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading && <Spinner />}
                <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className="col-md-3 my-2" key={element.url}>
                            <BlogItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} />
                        </div>
                    })}
                </div>




                <div>
                    <div className="container d-flex justify-content-evenly ">
                        <button type="button" className="btn btn-warning" hidden={this.state.page <= 1} onClick={this.clickPrevious}> 	&larr; Previous</button>

                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} className="btn btn-warning" onClick={this.clickNext}>Next &rarr;</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Blog
