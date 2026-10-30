main{
    flex:1;
    margin-left:280px;
    padding:25px;
    min-height:100vh;
    overflow-y:auto;
}

header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:30px;
}

.user{
    color:var(--text-secondary);
}

#content{
    width:100%;
}

.card{
    background:var(--card);
    border-radius:12px;
    padding:20px;
    margin-top:20px;
    color:white;
}

.stats{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
}

.stat{
    background:var(--card);
    padding:20px;
    border-left:4px solid var(--blue);
    border-radius:12px;
}

.stat-value{
    font-size:36px;
    font-weight:bold;
}
