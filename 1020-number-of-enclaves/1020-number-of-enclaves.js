/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function(grid) {
    const seen = new Set();
    let count = 0;
    for(let r = 0 ; r < grid.length; r++) {
        for(let c = 0 ; c < grid[0].length; c++) {
            count += dfs(grid,r,c,seen, new Set());
        }
    } 
    return count;
};

const dfs = (grid,r,c,seen,srounded) => {
    const rowInbound = 0 <=  r && r < grid.length;
    const colInbound = 0 <= c && c < grid[0].length;
    if(!rowInbound || !colInbound) return 0;
    const node = `${r},${c}`;
    if(seen.has(node)) return 0;
    seen.add(node);
    if(grid[r][c] == 0) return 0;
    const sroundedByZeros = moveUp(grid,r,c) && moveDown(grid,r,c) && moveRight(grid,r,c) && moveLeft(grid,r,c);
    
    if(sroundedByZeros) srounded.add(node);
    else srounded.add(false)
    dfs(grid,r+1,c,seen, srounded);    
    dfs(grid,r-1,c,seen, srounded);
    dfs(grid,r,c+1,seen, srounded);
    dfs(grid,r,c-1,seen, srounded);
    return srounded.has(false) ? 0 : srounded.size;
}

const moveUp = (grid,r,c) => {
    const rowInbound = 0 <=  r && r < grid.length;
    if(!rowInbound) return false;
    if(grid[r][c] == 0) return true;
    return moveUp(grid,r+1,c);
}

const moveDown = (grid,r,c) => {
    const rowInbound = 0 <=  r && r < grid.length;
    if(!rowInbound) return false;
    if(grid[r][c] == 0) return true;
    return moveDown(grid,r-1,c);
}

const moveRight = (grid,r,c) => {
    const colInbound = 0 <= c && c < grid[0].length;
    if(!colInbound) return false;
    if(grid[r][c] == 0) return true;
    return moveRight(grid,r,c+1);
}

const moveLeft = (grid,r,c) => {
    const colInbound = 0 <= c && c < grid[0].length;
    if(!colInbound) return false;
    if(grid[r][c] == 0) return true;
    return moveLeft(grid,r,c-1);
}