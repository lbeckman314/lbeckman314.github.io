// A small, hand-picked set of fortune-cookie-style quips in the spirit of
// the classic Unix `fortune` program, for the cow layer's speech bubble.
// Deliberately original/tame rather than pulled from fortune-mod's
// datfiles, since some of those carry per-author copyright or off-color
// content unsuited to a public site.
export const FORTUNES: string[] = [
  "You will find a bug right after saying 'it works fine on my machine.'",
  "A watched build never finishes; an unwatched one fails.",
  "Beware of bugs in the above code; I have only proved it correct, not tried it.",
  "There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
  "The best time to refactor was six months ago. The second best time is never, according to your deadline.",
  "Any sufficiently advanced CSS is indistinguishable from magic.",
  "A good programmer looks both ways before crossing a one-way street.",
  "Today's random seed favors bold commits.",
  "You will be blessed with a merge conflict that resolves itself.",
  "The cow says: don't push directly to main.",
  "Fortune favors those who read the error message.",
  "Your code compiles on the first try. Be suspicious.",
  "He who laughs last probably forgot a semicolon.",
  "The obstacle in your path is a stale cache. Clear it and proceed.",
  "You will meet a tall, dark, and handsome stack trace.",
  "Do not fear the recursion. Fear the missing base case.",
  "A journey of a thousand commits begins with `git init`.",
  "Great things are done by a series of small `git commit`s.",
  "The tallest oak was once a nut that stood its ground; the cleanest code was once a rough draft that got refactored.",
  "In the middle of difficulty lies opportunity, and also probably a null pointer.",
  "It is during our darkest moments that we must focus to see the light, and check the logs.",
  "Simplicity is the soul of efficiency.",
  "The only true wisdom is in knowing you know nothing about why the build failed.",
  "Whatever you are, be a good one, and write tests for it.",
  "Patience is bitter, but its fruit is a passing CI pipeline.",
  "A ship in harbor is safe, but that is not what ships (or deploys) are built for.",
  "Yesterday's ten-minute task is today's yak shave.",
  "Success is stumbling from failure to failure with no loss of enthusiasm, and a good stack trace.",
  "The expert in anything was once a beginner who kept committing.",
  "It always seems impossible until it's `git push`ed.",
  "The moo you seek is closer than you think.",
  "Not all who wander into legacy code are lost, but most are.",
  "A cow in the hand is worth two in the `TODO` comment.",
  "Curiosity typed the command. Curiosity also read the man page first.",
  "Measure twice, `rm -rf` once. Actually, measure three times.",
  "The grass is always greener in the other branch, until you check it out.",
  "You will soon receive good news in a pull request.",
  "Fortune whispers: the bug is in the last place you look, because you stop looking once you find it.",
  "Even a stopped clock's cron job is right twice a day.",
  "A wise developer once said nothing, because the mic was on mute.",
];

export function randomFortune(): string {
  return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
}
