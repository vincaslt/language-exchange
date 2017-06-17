import * as React from 'react'

export type Props = React.HTMLAttributes<HTMLVideoElement> & {
  source?: MediaStream | string
}

export default class VideoPlayer extends React.Component<Props, {}> {
  videoPlayer: HTMLVideoElement

  isSrcString = ({ source }: Props) => {
    return typeof source === 'string'
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.source && !this.isSrcString(nextProps)) {
      this.videoPlayer.srcObject = nextProps.source as MediaStream
    }
  }

  render() {
    const { source, ...rest } = this.props
    const renderVideo = ({ ...props }) => (
      <video ref={(player) => this.videoPlayer = player} autoPlay {...props} />
    )

    if (this.isSrcString(this.props)) {
      return renderVideo({ src: source, ...rest })
    } else {
      return renderVideo(rest)
    }
  }
}