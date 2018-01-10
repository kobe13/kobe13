const Page = ({children}) => (
    <div>
        <h1>
            Hacker News
        </h1>
        {children}
        <p>
                All rights reserved
                <style jsx>{
                    `font-size: small`
                }</style>
        </p>
    </div>
);

export default Page