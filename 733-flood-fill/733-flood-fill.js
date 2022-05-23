/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    
    const oldColor = image[sr][sc];
    const seen = new Set();
    
    //2. create dfs function which take the image as an argument, position, seen, floodFill
    return dfs(image, sr,sc,oldColor, newColor, seen);
};

const dfs = (image, r, c, oldColor, newColor, seen) => {
    const rowInbound = 0 <= r && r < image.length;
    const colInbound = 0 <= c && c < image[0].length;
    if(!rowInbound || !colInbound) return image;
    
    const node = `${r},${c}`;
    
    if(seen.has(node)) return image;
    seen.add(node);
    
    if(image[r][c] !== oldColor) return image;
    
    image[r][c] = newColor;
   
    dfs(image, r+1, c, oldColor, newColor, seen);
    dfs(image, r-1, c, oldColor, newColor, seen);
    dfs(image, r, c+1, oldColor, newColor, seen);
    dfs(image, r, c-1, oldColor, newColor, seen);
   
    return image;
}