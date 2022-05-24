/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let max = 0;
    const seen = new Set();
    for(let r = 0 ; r < grid.length; r++) {
        for(let c = 0 ; c < grid[0].length ; c++) {
            const size = dfs(grid, r, c, seen);
            if(size > max) max = size;
        }
    }
    return max;
};

const dfs = (grid, r, c, seen) => {
    const rowInbound = 0 <= r && r < grid.length;
    const colInbound = 0 <= c && c < grid[0].length;
    
    if(!rowInbound || !colInbound) return 0;
    const node = `${r},${c}`;
    if(seen.has(node)) return 0;
    seen.add(node);
    if(grid[r][c]==0) return 0;
    
    let size = 1;
    size +=  dfs(grid, r+1, c, seen);
    size +=  dfs(grid, r-1, c, seen);
    size +=  dfs(grid, r, c+1, seen);
    size +=  dfs(grid, r, c-1, seen);
    return size;
}