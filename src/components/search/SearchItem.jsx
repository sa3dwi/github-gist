import React from 'react';

const SearchItem = (props) => {

    return (
        <li className="list-item">
            <div>
                <span className="strong7">Description: </span> <p> {props.item.description} </p><br/>
                <span className="strong7">Comments: </span>{props.item.comments} <br/>
                <span className="strong7">Created at: </span>{props.item.created_at} <br/>
                <span className="strong7">Updated at: </span>{props.item.updated_at} <br/>
                <ul className="flex-list flex-item">
                    {typeof(props.item.files) !== 'undefined' ?
                        props.item.files.length > 0 && props.item.files.map((file, index) => {
                        return (
                            <div className="flex-item" key={index}>
                                <img width="32" height="32" alt={file.language} src={`./../../../images/badges/${file.language.toLowerCase()}.png`} 
                                onError={(e)=>{e.target.onerror = null; e.target.src="./../../../images/badges/default.png"}} />
                            </div>
                        );
                    }): ''}
                </ul> 
                <ul className="flex-list flex-item">
                    <img width="16" height="16" alt="forkList" src="./../../../images/fork.png"/>
                    {typeof(props.item.forks) === 'undefined' || props.item.forks.length === 0 ? 
                        <span>
                            No forks
                        </span> 
                        :
                        props.item.forks.length > 0 && props.item.forks.map((fork, index) => {
                            return (
                                <a key={index} target="_blank" className="flex-item" rel="noopener noreferrer" href={fork.html_url}>
                                    <img className="user_avatar" width="64" height="64" alt={fork.username} src={fork.avatar_url}
                                        onError={(e)=>{e.target.onerror = null; e.target.src="./../../../images/gitHub_logo.png"}} /> {fork.username}</a>                               
                            );
                        })
                    }
                </ul> 
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={props.item.html_url}>Browse Gist page</a>
            </div>
        </li>
    );
    
};

export default SearchItem;