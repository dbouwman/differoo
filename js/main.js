var original = {
	name: 'Original Name',
	description: 'it\'s an object!',
	details: {
		it: 'has',
		an: 'array',
		with: ['a', 'few', 'elements']
	}
};
var mine = {
	name: 'my updated name',
	description: 'it\'s an object!',
	details: {
		it: 'has',
		an: 'array',
		with: ['a', 'few', 'elements']
	}
};

var yours = {
	name: 'your updated name',
	description: 'it\'s an object!',
	details: {
		it: 'has',
		an: 'array',
		with: ['a', 'few', 'more', 'elements', { than: 'before' }]
	}
};


var originalToMine = jsonpatch.compare(original, mine);
var mineToYours = jsonpatch.compare(mine, yours);

// clone mine so we don't lose it's content
var clone = JSON.parse(JSON.stringify(mine));

// find collisions - which is where the path is the same in both diffs
var collisions = [];
mineToYours.forEach(function(patch) {
  // see if this is in the originalToMine ...
  let match = originalToMine.find(function(o2mPatch) {
    return o2mPatch.path === patch.path;
  });
  if (match) {
    collisions.push(patch)
  } else {
    jsonpatch.apply(clone, [patch]);
  }
});


// jsonpatch.apply(clone, patches);

show('#original', JSON.stringify(mine, null,2));
show('#mine', JSON.stringify(mine, null,2));
show('#yours', JSON.stringify(yours, null,2));
show('#originalToMine', JSON.stringify(originalToMine, null,2));
show('#mineToYours', JSON.stringify(mineToYours, null,2));
show('#collisions', JSON.stringify(collisions, null,2));
show('#output', JSON.stringify(clone, null,2));

function show(id, content ){
  var el = document.querySelector(id);
  el.innerHTML= content;
}
