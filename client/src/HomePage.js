import React from 'react';
import './HomePage.css';
class HomePage extends React.Component{
constructor(props){
    super(props);
    this.state={
        temp:[]
    }
}
    componentDidMount(){
        fetch('https://buttercup-island.glitch.me/latest')
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
           // console.log(result.topic_list.topics);
          //  let max=result.users[0].id;
          let totaltemp=[];
          result.topic_list.topics.forEach((item,index)=>{
            let temp=[];
          temp.push(<div className="title" key={(index+1)*1}><a className="link" target="__blank" href={"https://forum.freecodecamp.org/t/"+item.title.toLowerCase().replace(/[^a-z\d]/g,"-")}>{item.title}</a></div>);
let profiles=[];
            for(let a in  item['posters']){
                console.log(item.posters[a]+" posters");
                for(let b in result.users){
                    console.log(result.users[a].id+" a");
                  //  console.log(item.posters[a]['user_id']+" b");
                if(item.posters[a]['user_id']===(result.users[b].id)){
                    console.log("MAtch")
                   // temp=temp+this.state.users[b].username+" | ";
                   //let link=<img src='https://forum.freecodecamp.org/{this.state.users[b].avatar_template.replace("{size}","120")}'/>;
                //https://forum.freecodecamp.org/user_avatar/forum.freecodecamp.org/bhavsagar/120/171069_2.png
                var initLink=result.users[b].avatar_template.replace("{size}","30");
                let link=initLink;
                let imgLink="https:/forum.freecodecamp.org/u/"+result.users[b].username;
                if(!initLink.includes("https",0)){
                    link="https://forum.freecodecamp.org"+initLink;
                
                }
                
                profiles.push(<a target="__blank"  href={imgLink}><img alt={result.users[b].username} title={result.users[b].username} className="profileImages" src={link}/></a> );
                profiles.push(" ");
                
                break;
                }
                //max=Math.max(result.users[a].id,max);
                } 

                //temp=temp+item.posters[a].user_id+" | ";
                     }

                    //  totaltemp.push(item.title+" "+temp+" "+item.reply_count+" "+item.views);
                    let ans=0;
                    let seconds=0;
                    seconds=(new Date().getTime()-new Date(item.bumped_at).getTime())/1000;
                    if(seconds<60){
               ans=Math.floor(seconds)+"s";
                    }else{
                       let minutes=0;
                       minutes=seconds/60;
                       if(minutes>=60){
                           ans=Math.floor(minutes/60)+"h";
                       
                       }else{
                           ans=Math.floor(minutes)+"m";
                       }
                    }

                temp.push(<div className="profile" key={(index+1)*2}>{profiles}</div>);
                temp.push(<div className="replyCount" key={(index+1)*3}>{item.reply_count}</div>);
                temp.push(<div className="views" key={(index+1)*5}>{item.views}</div>);
                temp.push(<div className="time" key={(index+1)*6}>{ans}</div>);
                    totaltemp.push(temp);




          });
          
         
          
                this.setState({
                temp:totaltemp

            });


        });
    }
render(){
    return(<div id="main">
        {/* <h1>freeCodeCamp Forum</h1> */}
        <div>
            {this.state.temp.length===0 ? <p style={{"textAlign":"center"}}>Loading....</p>:<div className="head">
                
            <div className="numbering">#</div>
            <div className="title titleHead">Topic</div>
            <div className="profile profileTitle"><p className="desktop">Profiles</p><p className="mob">Prof.</p></div>
            <div className="replyCount replyCountTitle"><p className="desktop">Replies</p><p className="mob">Re</p></div>
            <div className="views viewsTitle"><p className="desktop">Views</p><p className="mob">Vie</p></div>
            <div className="time timeTitle"><p className="desktop">Activity</p><p className="mob">Act</p></div>
                       
            </div>}
            <hr></hr>

            <ol>
              {this.state.temp.map((item,index)=>{
    
    
   
//(ans===NaN ? "Hello":ans)
//console.log(ans+" ans");
              return <li key={(index+1)*7}><div className="numbering">{index+1}</div> {item}</li>})}
                 
            </ol>
{/* <ol>
    {this.state.users.map((item,index)=>{
        return <li>{item.username}</li> 
    })}
</ol>
<ol>
    
    {this.state.topicList.map((item,index)=>{
        console.log(index);
        console.log(item.posters);
    let temp="";
        for(let a in  item['posters']){
console.log(item.posters[a]);
temp=temp+item.posters[a].user_id+" | ";
        }
    //    return item.posters.map((a,b)=>{
    //     return <li>{a.user_id}</li>
    //     });
    return <li>{temp}</li>
    })}
</ol> */}
        </div>
        </div>)
}
}

export default HomePage;