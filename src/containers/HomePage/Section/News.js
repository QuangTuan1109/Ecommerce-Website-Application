import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './News.scss'

class News extends Component {

    render() {
        return (
            <div className='news-section'>
                <div className='title-news-section'>
                    <span>Shopping News</span>
                </div>
                <div className='grid-news-section'>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-teal'>Technology</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                   <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-purple'>Fashion</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>Giga Mall</h5></Link>
                                    <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-teal'>Technology</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                   <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-purple'>Fashion</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>Giga Mall</h5></Link>
                                    <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-teal'>Technology</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                   <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-purple'>Fashion</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>Giga Mall</h5></Link>
                                    <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-teal'>Technology</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                   <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-purple'>Fashion</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>Giga Mall</h5></Link>
                                    <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-teal'>Technology</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                   <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-purple'>Fashion</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>Giga Mall</h5></Link>
                                    <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-teal'>Technology</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                   <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blog-card'>
                        <div className='blog-card-header'>
                            <Link to='/' className='link-image-blog'>
                                <div className='image-blog-card' />
                            </Link>
                        </div>
                        <div className='blog-card-body'>
                            <span className='tag tag-purple'>Fashion</span>
                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                            <p>An exploration into the truck's polarising design</p>
                            <div className='author'>
                                <Link to='/' className='link-image-author'>
                                    <div className='avt-author' />
                                </Link>
                                <div className='news-info'>
                                    <Link to='/' className='name-link'><h5>Giga Mall</h5></Link>
                                    <small>2h ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='button-see-more'>
                    <Link to='/' className='button'>See more</Link>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
