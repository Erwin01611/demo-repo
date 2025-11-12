# Portfolio 3D - Workflow Guide

**How to Work with Claude + Claude Code**

This guide explains how to use Claude Project and Claude Code together to build your portfolio website efficiently while maintaining context across sessions.

---

## 🎭 Understanding the Roles

### Claude (in Claude Project) - Your Product Manager
**What I Do:**
- ✅ Provide strategic direction
- ✅ Break down complex features into steps
- ✅ Review progress and suggest next steps
- ✅ Help with positioning and messaging
- ✅ Debug conceptual issues
- ✅ Maintain project context
- ✅ Read all context files automatically

**What I DON'T Do:**
- ❌ Write actual code
- ❌ Directly manipulate files
- ❌ Make commits to GitHub

**Think of me as**: The architect who designs the building but doesn't lay the bricks.

---

### Claude Code - Your Senior Developer
**What It Does:**
- ✅ Writes actual code
- ✅ Creates and modifies files
- ✅ Debugs implementation issues
- ✅ Commits and pushes to GitHub
- ✅ Implements features from specs

**What It Doesn't Do:**
- ❌ Make strategic decisions
- ❌ Know the full project context (unless you tell it)
- ❌ Remember previous sessions

**Think of it as**: The skilled builder who executes the plans.

---

### You - The Product Owner
**Your Role:**
- ✅ Make final decisions
- ✅ Test features
- ✅ Provide feedback
- ✅ Update PROGRESS.md
- ✅ Approve direction

---

## 🔄 The Development Loop

### Step 1: Start with Claude (Me)
**Open your Claude Project** and ask:
- "What should we build next?"
- "I finished Phase X, what's next?"
- "How should I approach [feature]?"

**I will:**
1. Read `PROGRESS.md` to see where you are
2. Check `ROADMAP.md` for next phase
3. Review `PROJECT_BRIEF.md` for context
4. Give you clear next steps
5. Provide a prompt for Claude Code

---

### Step 2: Go to Claude Code
**Copy the prompt I gave you** and paste it into Claude Code.

**Claude Code will:**
1. Implement the feature
2. Create/modify necessary files
3. Commit changes
4. Push to your GitHub repo
5. Tell you what to do next

---

### Step 3: Test Locally
In your terminal:
```bash
cd demo-repo/portfolio-3d
git pull              # Get latest changes
npm run dev          # Start dev server
```

**Open browser** to `localhost:5173` and test:
- Does it work?
- Does it look good?
- Any errors in console?
- Performance OK?

---

### Step 4: Report Back to Claude (Me)
Come back to Claude Project and tell me:

**If it works:**
"Phase X is done! Here's what's working: [describe]. Ready for next phase!"

**If there are issues:**
"Phase X has [specific issue]. Here's what I'm seeing: [describe/screenshot]."

**I will:**
- Update you on progress
- Help debug if needed
- Give you the next prompt for Claude Code
- Keep track of overall status

---

### Step 5: Update Progress (Important!)
After completing a phase, either:

**Option A: Ask me to update it**
"Can you update PROGRESS.md to reflect Phase X is complete?"

**Option B: Ask Claude Code to update it**
Tell Claude Code: "Mark Phase X as complete in PROGRESS.md and add [any notes]."

**Why this matters:** Keeps context fresh for future sessions!

---

## 🏗️ Setting Up Your Claude Project

### Initial Setup (Do This Once)

#### 1. Create the Project
1. Go to claude.ai
2. Click "Projects" in sidebar
3. Click "Create Project"
4. Name it: "Portfolio 3D"
5. Add a description (optional)

#### 2. Add Your GitHub Repo
1. In your project, click "Add content"
2. Choose "GitHub repository"
3. Select your `demo-repo` repository
4. Claude will now read ALL files in your repo! ✅

**This means:**
- I can see your code
- I can see PROJECT_BRIEF.md, ROADMAP.md, PROGRESS.md
- I always have full context
- No need to explain from scratch each time

#### 3. Verify Context Files
In a new chat in your project, ask:
"What phase am I on?"

If I can answer correctly, setup is working! ✅

---

## 💬 Effective Communication Patterns

### Starting a New Session

**❌ DON'T say:**
"Hi, I'm building a portfolio website with 3D..."

**✅ DO say:**
"Hey! What should I work on next?"

(I'll read PROGRESS.md automatically and know everything)

---

### Asking for Next Steps

**❌ DON'T say:**
"I need help with Three.js"

**✅ DO say:**
"I finished the hero section. Ready for Phase 3!"

(Gives me context about where you are)

---

### Reporting Issues

**❌ DON'T say:**
"It's not working"

**✅ DO say:**
"The sphere isn't visible. Console shows no errors. I can see it in the graphics inspector but not on the page."

(Specific observations help me debug faster)

---

### Getting Implementation Details

**❌ DON'T say:**
"How do I code this in Three.js?"

**✅ DO say:**
"What should I tell Claude Code to build for Phase 4?"

(I give you the prompt, Claude Code writes the code)

---

## 📁 File Management

### Which Files Go Where

**In Your GitHub Repo** (`demo-repo`):
```
demo-repo/
├── portfolio-3d/           # Your actual website code
│   ├── src/
│   ├── public/
│   └── package.json
├── PROJECT_BRIEF.md        # Full project context ✅
├── ROADMAP.md              # Implementation plan ✅
├── PROGRESS.md             # Current status ✅
└── WORKFLOW.md             # This file ✅
```

**Not in Repo** (Just for reference):
- Your CV (unless you want it there)
- Personal notes
- Random drafts

---

### Updating Context Files

**PROJECT_BRIEF.md**: Rarely changes
- Only update if positioning or vision changes
- Usually stays static

**ROADMAP.md**: Rarely changes
- Only update if you change the plan significantly
- Mostly reference-only

**PROGRESS.md**: Update frequently!
- After each phase completion
- When you hit blockers
- When you make key decisions
- This is your "save file"

**WORKFLOW.md**: Almost never changes
- Only if you discover better processes
- Reference-only

---

## 🚨 Common Scenarios

### Scenario 1: "I want to make a change to the plan"

**Do this:**
1. Talk to Claude (me) in Project
2. Discuss the change
3. I'll help you think through implications
4. We update ROADMAP.md or PROGRESS.md
5. Continue with adjusted plan

---

### Scenario 2: "Something broke"

**Do this:**
1. Check browser console for errors
2. Take screenshots
3. Go to Claude (me) in Project
4. Share what you're seeing
5. I'll give you debugging steps or a fix prompt for Claude Code

---

### Scenario 3: "I have a new idea"

**Do this:**
1. Tell Claude (me) in Project
2. I'll help you evaluate:
   - Does it fit the vision?
   - When should we build it?
   - How complex is it?
3. We decide together
4. Add to PROGRESS.md as future idea or immediate task

---

### Scenario 4: "I'm starting a new chat session"

**Do this:**
1. Open your Claude Project
2. Start new chat
3. Simply say: "What should I work on next?"
4. I'll read PROGRESS.md and catch up automatically ✅

**You DON'T need to:**
- ❌ Explain the whole project again
- ❌ Tell me what you've built
- ❌ Share your CV again
- ❌ Describe the tech stack

**I already know all of this from the context files!**

---

### Scenario 5: "Claude Code made something I don't like"

**Do this:**
1. Come back to Claude (me)
2. Explain what you don't like and why
3. I'll give you a new prompt with specific changes
4. Paste updated prompt into Claude Code
5. It'll revise the implementation

---

## 🎯 Best Practices

### DO:
- ✅ Keep PROGRESS.md updated
- ✅ Test locally before moving on
- ✅ Take screenshots when asking for help
- ✅ Be specific about issues
- ✅ Trust the process
- ✅ Ask questions when unsure

### DON'T:
- ❌ Skip testing phases
- ❌ Let PROGRESS.md get stale
- ❌ Expect Claude Code to know full context
- ❌ Rush through phases
- ❌ Deploy before testing
- ❌ Ignore performance issues

---

## 📚 Quick Reference Commands

### Git Commands
```bash
# Get latest code
git pull

# Check status
git status

# See recent changes
git log --oneline -5

# Switch branches (if needed)
git checkout main
```

### Development Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Install new package
npm install [package-name]

# Check for errors
npm run lint
```

### Deployment Commands
```bash
# Deploy to GitHub Pages
npm run deploy

# Or use Vercel
vercel
```

---

## 🆘 When Things Go Wrong

### "I can't see my changes"
1. Did you run `git pull`?
2. Did you refresh the browser?
3. Try hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
4. Check if dev server is running

### "Claude doesn't remember our conversation"
1. Are you in the Claude Project?
2. Is your repo connected to the project?
3. Is PROGRESS.md up to date?
4. Try: "Read PROGRESS.md and tell me where we are"

### "Claude Code won't connect to my repo"
1. Check GitHub permissions
2. Try disconnecting and reconnecting
3. Make sure you're in the right repo
4. Contact Claude Code support if persistent

### "I made a mistake and want to undo"
```bash
# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Undo last commit (loses changes - careful!)
git reset --hard HEAD~1

# Revert specific file
git checkout HEAD -- path/to/file
```

---

## 💡 Pro Tips

1. **Start each session by checking PROGRESS.md**
   - Reminds you where you left off
   - Keeps you focused

2. **Keep a browser tab open with localhost:5173**
   - Easy to test changes immediately
   - Faster iteration

3. **Screenshot things that work well**
   - Useful for reference
   - Can show Claude when describing desired behavior

4. **Don't overthink the 3D elements**
   - Start simple (primitives)
   - Can always enhance later
   - Working > Perfect

5. **Deploy early and often**
   - Share with friends for feedback
   - Catch issues in production
   - Stay motivated by seeing progress live

6. **Take breaks between phases**
   - Let ideas marinate
   - Come back with fresh eyes
   - Prevents burnout

---

## 🎓 Learning as You Go

### You're Learning:
- React development
- Three.js / WebGL basics
- Animation principles
- Git workflow
- Project management
- Working with AI tools

### Resources When Stuck:
- **Three.js Docs**: threejs.org/docs
- **React Three Fiber**: docs.pmnd.rs/react-three-fiber
- **GSAP**: greensock.com/docs
- **MDN Web Docs**: developer.mozilla.org

### When to Google vs. Ask Claude:
- **Ask Claude**: Strategy, architecture, "what should I do?"
- **Google**: Specific API syntax, error messages, examples

---

## 🚀 Success Habits

1. **Ship regularly**: Deploy after each phase
2. **Test on mobile**: Don't wait until the end
3. **Get feedback**: Share with friends/colleagues
4. **Iterate**: First version doesn't need to be perfect
5. **Document**: Update PROGRESS.md after each session
6. **Celebrate**: Acknowledge wins, even small ones!

---

## 📞 Getting Help

### From Claude (Me):
- Strategic questions
- "What should I build?"
- Design decisions
- Debugging concepts
- Breaking down complex features

### From Claude Code:
- Implementation questions
- "How do I write this code?"
- Syntax errors
- File creation/modification

### From Documentation:
- API specifics
- Library usage
- Best practices
- Example code

### From Community:
- Complex bugs
- Performance optimization
- Advanced techniques
- Real-world examples

---

## ✨ Final Thoughts

**Remember**: This is an iterative process. Each phase makes the site better. Don't aim for perfection—aim for progress.

**You've got this!** The system is set up, the plan is clear, and both Claude and Claude Code are here to help.

**Start each session with**: "What's next?"  
**End each session with**: Update PROGRESS.md

**Let's build something awesome!** 🚀

---

**Questions about this workflow?**  
Ask me (Claude) in your Project! I'm here to help you succeed.
