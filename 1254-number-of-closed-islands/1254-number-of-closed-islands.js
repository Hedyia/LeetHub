/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    const seen = new Set();
    let closedIslandsCount = 0;
    
    for(let r = 0 ; r < grid.length ; r++) {
        for(let c = 0 ; c < grid[0].length; c++) {
            if( dfs(grid, r,c,seen, new Set()) ) closedIslandsCount++;
        }
    }
    return closedIslandsCount;
};

const dfs = (grid, r,c,seen,notSurrounded ) => {
    const rowInbound = 0 <= r && r < grid.length;
    const colInbound = 0 <= c && c < grid[0].length;
    if(!rowInbound && !colInbound) return false;
    const node = `${r},${c}`;
    if(seen.has(node)) return false;
    seen.add(node);
    if(grid[r][c] == 1) return false;
    if(!cornersInbound(grid,r,c)) return false;
    
    const surrounded = (moveUp(grid,r,c) && moveDown(grid,r,c) && 
                            moveRight(grid,r,c) && moveLeft(grid,r,c));
    
    if(!surrounded) notSurrounded.add(true);
    
    dfs(grid,r+1,c,seen, notSurrounded);
    dfs(grid,r-1,c,seen, notSurrounded);
    dfs(grid,r,c+1,seen, notSurrounded);
    dfs(grid,r,c-1,seen, notSurrounded);
    return notSurrounded.size == 0 ;
}

const moveUp = (grid,r,c) => {
    const rowInbound = 0 <= r && r < grid.length;
    if(!rowInbound) return false;
    if(grid[r][c] == 1) return true;
    return moveUp(grid,r+1,c);
}
const moveDown = (grid,r,c) => {
    const rowInbound = 0 <= r && r < grid.length;
    if(!rowInbound) return false;
    if(grid[r][c] == 1) return true;
    return moveDown(grid,r-1,c);
}
const moveRight = (grid,r,c) => {
    const colInbound = 0 <= c && c < grid[0].length;
    if(!colInbound) return false;
    if(grid[r][c] == 1) return true;
    return moveRight(grid,r,c+1);
}
const moveLeft = (grid,r,c) => {
    const colInbound = 0 <= c && c < grid[0].length;
    if(!colInbound) return false;
    if(grid[r][c] == 1) return true;
    return moveLeft(grid,r,c-1);
}

const cornersInbound = (grid,r,c) => {
    const upInbound = (0 <= r+1 && r+1 < grid.length);
    const downInbound = (0 <= r-1 && r-1 < grid.length);
    const rightInbound = (0 <= c+1 && c+1 < grid[0].length);
    const leftInbound = (0 <= c-1 && c-1 < grid[0].length);
    return upInbound && downInbound && rightInbound && leftInbound;
}
