import React, { Component } from 'react'

export class BlogItem extends Component {
    render() {
        let {title,description,imageUrl,blogUrl,author,date}=this.props;
        return (
            <div>
                <div className="card" >
                    <img src={imageUrl ? imageUrl :"https://i.gadgets360cdn.com/large/nasa_dart_blog_post_1636178896455.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on { new Date(date).toGMTString()}</small></p>
                        <a  rel="noreferrer" href={blogUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogItem
