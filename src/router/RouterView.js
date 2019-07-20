import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'

class RouterView extends Component {
    render() {
        // 1.接受参数
        let {routes}=this.props
        // 2.过滤出带有重定向的对象
        let arrRouter= routes.filter(v=>v.redirect)
        
        // 3.把重定向写出来   exact精确  必须 /abc/123
        let RedirectS=arrRouter.map((v,i)=>{
            return <Redirect key={i} from={v.path} exact to={v.redirect} />
        })
        // 4.过滤出没有重定向的配置
        routes=routes.filter(v=>!v.redirect)
        return (
            // 5.Switch 开始写Route
            <Switch>
                {
                    // 6.遍历新的数组（没有重定向的）
                   routes.map((v,i)=>{
                       return <Route key={i} path={v.path} render={(props)=>{
                           return <>
                                    {v.children&&
                                        <v.component children={v.children} {...props} />
                                    }
                                    {!v.children&&
                                        <v.component {...props} />
                                    }
                                </>
                       }} />
                   }) 
                }
                {RedirectS.length!==0&&RedirectS}
            </Switch>
        );
    }
}

export default RouterView;