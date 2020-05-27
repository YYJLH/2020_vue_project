<template>
    <el-container>
        <!-- 头部区域 -->
        <el-header>
            <div class="header_logo">
                <img src="../assets/heima_logo.png" alt="">
                <h2>电商管理系统</h2>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 下面的主题区域 -->
        <el-container>
            <el-aside :width="iscollapse? '65px': '200px'">
            <!-- 左侧展开menu的bar -->
            <div class="toggleBar" @click="iscollapse=!iscollapse">|||</div>
            <!-- 左侧的menu -->
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#333744"
                    router
                    unique-opened
                    :collapse ="iscollapse"
                    :collapse-transition="false"
                    text-color="#fff"
                    active-text-color="#409FFF">
                    <el-submenu :index="item.id + '' " v-for="(item,i) in menuList" :key="item.id" :class="iscollapse ? 'el_submen_small':'el_submen_large'">
                        <template slot="title">
                        <i :class="['iconfont',iconList[i]]"></i>
                        <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index=" '/' + submenu.path" v-for="submenu in item.children" :key="submenu.id">
                            <i class="el-icon-menu"></i>
                            {{submenu.authName}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧的menu -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data(){
        return{
            // 左侧菜单列表数组,默认为空
            menuList:[],
            // 左侧菜单相对应的图标数组
            iconList:['icon-users','icon-tijikongjian','icon-shangpin','icon-danju','icon-baobiao'],
            // 左侧控制折叠,是否为折叠,默认为false(没有折叠)
            iscollapse:false
        }
    },
    created() {
        this.getmenu()
    },
    methods: {
        // 点击退出,退出登录
        logout(){
            // 清空保存的登录信息
            window.sessionStorage.removeItem('token')
            // 清醒跳转到登录页面
            this.$router.push('/login')
        },
        // 获取左侧菜单列表
        async getmenu(){
            const {data: res} = await this.$http.get('menus')
            console.log(res)
            if(res.meta.status !== 200) return this.$message.error('获取左侧菜单列表失败')
            this.menuList = res.data
        }
    }
}
</script>
<style lang="less" scoped>
.el-container{
    width: 100%;
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    user-select: none;    
    .header_logo{
        display: flex;
        align-items: center;
        h2{
            font-weight: 200;
            color: #fff;
            padding-left: 20px
        }
    }
    .el-button{
       margin-right: 5px
    }
}
.el-aside{
    background-color: #333744;
    user-select: none;    
}
.el-main{
    background-color: #EAEDF1;
}
.iconfont{
    margin-right: 8px;
}
.toggleBar{
    color: #fff;
    font-size: 12px;
    line-height: 24px;
    background-color: #4A5064;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    user-select: none;
}
.el_submen_large{
    width: 200px;
}
.el_submen_small{
    width: 65px;
}
</style>

