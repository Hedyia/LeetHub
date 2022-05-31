/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function(grid1, grid2) {
    const seen = new Set();
    let count = 0 ;
    for(let r = 0 ; r < grid2.length; r++) {
        for(let c = 0 ; c < grid2[0].length; c++) {
            const connectedComponent = dfs(grid2,r,c,seen, new Map());
            if(connectedComponent.size != 0) {
                if( isSubIsland(grid1,connectedComponent) ) count ++;
            }
        }
    }
    return count;
};
const dfs = (grid, r,c, seen , connectedComponent) => {
    const rowInbound = 0 <= r && r < grid.length;
    const colInbound = 0 <= c && c < grid[0].length;
    if(!rowInbound || !colInbound) return connectedComponent;
    const node = `${r},${c}`;
    if(seen.has(node)) return connectedComponent;
    seen.add(node);
    if(grid[r][c] == 0) return connectedComponent;
    connectedComponent.set(node, [r,c]);
    dfs(grid,r+1,c,seen,connectedComponent);
    dfs(grid,r-1,c,seen,connectedComponent);
    dfs(grid,r,c+1,seen,connectedComponent);
    dfs(grid,r,c-1,seen,connectedComponent);
    return connectedComponent; 
}
const isSubIsland = (grid,connectedComponent) => {
    for (let [key, value] of connectedComponent) {

        if(grid[value[0]][value[1]] != 1) return false;
    }
    return true;
}