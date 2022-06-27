import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    var content = event.target.content.value
    var onlyNewLine = event.target.onlyNewLine.checked

    if (content) {
      const result = content

      if (onlyNewLine) {

        const searchRegExp = /<div class="separator" style="clear: both;">/gu;
        const replaceWith = '\n<div class="separator" style="clear: both;">';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /<div class="separator" style="clear: both;"><a.*><img/g;
        replaceWith = '<img';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /<\/a><\/div>/g;
        replaceWith = '';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /0" src="/g;
        replaceWith = '" width="100%" src="';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /s1600/g;
        replaceWith = '-rw';
        result = result.replace(searchRegExp, replaceWith);

      }else{
        const searchRegExp = /<div class="separator" style="clear: both;"><a.*><img/g;
        const replaceWith = '<img';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /<\/a><\/div>/g;
        replaceWith = '';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /0" src="/g;
        replaceWith = '" width="100%" src="';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /s1600/g;
        replaceWith = '-rw';
        result = result.replace(searchRegExp, replaceWith);

        searchRegExp = /<iframe width=".*" height/g;
        replaceWith = '<iframe width="100%" height';
        result = result.replace(searchRegExp, replaceWith);

        var lines = result.split("\n");
        for(var i=0; i<lines.length; i++) {
          lines[i] = (lines[i]) ? "<p>" + lines[i] + "</p>" : '';
        }

        result = lines.join("\n");
      }

      result = result.replace(/^\s*[\r\n]/gm, '') //remove empty line

      if (onlyNewLine) {
        //add space line
        var lines = result.split("\n");
        for(var i=0; i<lines.length; i++) {
          lines[i] = lines[i] + "\n"
        }
        result = lines.join("\n");
      }

      event.target.result.value = result
    }

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Blog
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          <label htmlFor="content">add content</label>
          <textarea id="content" name="content"></textarea>

          <label htmlFor="content">this result</label>
          <textarea id="result" name="result"></textarea>

          <div className={styles.mb15}>
            <label htmlFor="content">gen new line photo</label>
            <input type="checkbox" id="onlyNewLine" name="onlyNewLine"/>
          </div>

          <div>
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
          </div>
        </form>
        
      </main>

    </div>
  )
}
